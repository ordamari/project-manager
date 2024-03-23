import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/users/entities/user.entity'
import { Repository } from 'typeorm'
import { HashingService } from '../hashing/hashing.service'
import { SignUpDto } from 'src/iam/dto/sign-up.dto'
import { SignInDto } from 'src/iam/dto/sign-in.dto'
import { JwtService } from '@nestjs/jwt'
import { ConfigType } from '@nestjs/config'
import jwtConfig from 'src/iam/config/jwt.config'
import {
    COOKIES_ACCESS_TOKEN_KEY,
    COOKIES_REFRESH_TOKEN_KEY,
    PG_UNIQUE_VIOLATION_ERROR_CODE,
} from 'src/iam/iam.constants'
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface'
import { SignInData } from 'src/iam/interfaces/sign-in-data.interface'
import { Request, Response } from 'express'
import { generateTokensData } from 'src/iam/interfaces/generate-tokens-data.interface'
import {
    InvalidatedRefreshTokenError,
    RefreshTokenIdsStorage,
} from 'src/iam/storage/refresh-token-ids.storage/refresh-token-ids.storage'
import { randomUUID } from 'crypto'
import { RefreshTokenData } from 'src/iam/interfaces/refresh-token-data.interface'
import { Member } from 'src/companies/entities/member.entity'
import { ActiveMemberData } from 'src/iam/interfaces/active-member-data.interface'

@Injectable()
export class AuthenticationService {
    constructor(
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly hashingService: HashingService,
        private readonly jwtService: JwtService,
        private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage
    ) {}

    addTokenToCookie(response: Response, accessToken: string, refreshToken: string) {
        response.cookie(COOKIES_ACCESS_TOKEN_KEY, accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: true,
        })

        response.cookie(COOKIES_REFRESH_TOKEN_KEY, refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: true,
        })
    }

    async refreshTokens(request: Request): Promise<SignInData> {
        const refreshToken = this.extractRefreshTokenFromRequest(request)
        console.log({ refreshToken })

        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token is missing')
        }
        try {
            const payload = await this.jwtService.verifyAsync<RefreshTokenData>(refreshToken, {
                secret: this.jwtConfiguration.secret,
                issuer: this.jwtConfiguration.issuer,
                audience: this.jwtConfiguration.audience,
            })
            const user = await this.userRepository.findOne({ where: { id: payload.sub } })
            if (!user) {
                throw new UnauthorizedException('User does not exist')
            }
            await this.validateRefreshToken(payload)

            const { accessToken, refreshToken: newRefreshToken } = await this.generateTokens(user)
            return {
                user,
                accessToken,
                refreshToken: newRefreshToken,
            }
        } catch (error) {
            if (error instanceof InvalidatedRefreshTokenError) {
                throw new UnauthorizedException('Access denied')
            } else throw new UnauthorizedException()
        }
    }

    async signUp(signUpDto: SignUpDto): Promise<User> {
        try {
            const user = new User()
            user.email = signUpDto.email
            user.password = await this.hashingService.hash(signUpDto.password)
            await this.userRepository.save(user)
            return user
        } catch (error) {
            console.log({ code: error.code })

            if (error.code === PG_UNIQUE_VIOLATION_ERROR_CODE) {
                throw new ConflictException('User with this email already exists')
            } else throw error
        }
    }

    async signIn(signInDto: SignInDto): Promise<SignInData> {
        const user = await this.userRepository.findOne({ where: { email: signInDto.email } })
        if (!user) {
            throw new UnauthorizedException('User with this email does not exist')
        }
        const isPasswordCorrect = await this.hashingService.compare(signInDto.password, user.password)
        if (!isPasswordCorrect) {
            throw new UnauthorizedException('Password is incorrect')
        }
        const { accessToken, refreshToken } = await this.generateTokens(user)
        return {
            user,
            accessToken,
            refreshToken,
        }
    }

    private async generateTokens(user: User): Promise<generateTokensData> {
        const [accessToken, refreshToken] = await Promise.all([
            this.createAccessToken(user),
            this.createRefreshToken(user),
        ])
        return {
            accessToken,
            refreshToken,
        }
    }

    private async createRefreshToken(user: User): Promise<string> {
        const refreshTokenId = randomUUID()
        const refreshToken = await this.signToken<Partial<RefreshTokenData>>(
            user.id,
            this.jwtConfiguration.refreshTokenTtl,
            {
                refreshTokenId,
            }
        )
        await this.refreshTokenIdsStorage.insert(user.id, refreshTokenId)
        return refreshToken
    }

    private async createAccessToken(user: User): Promise<string> {
        const accessToken = await this.signToken<Partial<ActiveUserData>>(
            user.id,
            this.jwtConfiguration.accessTokenTtl,
            {
                email: user.email,
            }
        )
        return accessToken
    }

    async createMemberAccessToken(member: Member): Promise<string> {
        const memberAccessToken = await this.signToken<Partial<ActiveMemberData>>(
            member.id,
            this.jwtConfiguration.accessTokenTtl,
            {
                companyId: member.company.id,
                userId: member.user.id,
            }
        )
        return memberAccessToken
    }

    private async signToken<T>(userId: number, expiresIn: number, payload?: T) {
        return await this.jwtService.signAsync(
            {
                sub: userId,
                ...payload,
            },
            {
                secret: this.jwtConfiguration.secret,
                expiresIn,
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
            }
        )
    }

    private async validateRefreshToken(refreshTokenData: RefreshTokenData) {
        const isRefreshTokenValid = await this.refreshTokenIdsStorage.validate(
            refreshTokenData.sub,
            refreshTokenData.refreshTokenId
        )
        if (isRefreshTokenValid) {
            await this.refreshTokenIdsStorage.invalidate(refreshTokenData.sub)
        } else {
            throw new UnauthorizedException('Refresh token is invalid')
        }
    }

    private extractRefreshTokenFromRequest(request: Request): string | undefined {
        return request.cookies[COOKIES_REFRESH_TOKEN_KEY]
    }
}
