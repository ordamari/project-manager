import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import jwtConfig from 'src/iam/config/jwt.config'
import { COOKIES_ACCESS_TOKEN_KEY, REQUEST_USER_KEY } from 'src/iam/iam.constants'

@Injectable()
export class AccessTokenGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>()
        const token = this.extractTokenFromRequest(request)
        if (!token) throw new UnauthorizedException('Access token is missing')
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.jwtConfiguration.secret,
                issuer: this.jwtConfiguration.issuer,
                audience: this.jwtConfiguration.audience,
            })
            request[REQUEST_USER_KEY] = payload
            return true
        } catch (error) {
            throw new UnauthorizedException('Access token is invalid')
        }
    }

    private extractTokenFromRequest(request: Request): string | undefined {
        return request.cookies[COOKIES_ACCESS_TOKEN_KEY]
    }
}
