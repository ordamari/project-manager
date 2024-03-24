import { CanActivate, ExecutionContext, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Socket } from 'socket.io'
import jwtConfig from 'src/iam/config/jwt.config'
import { COOKIES_ACCESS_TOKEN_KEY, REQUEST_MEMBER_KEY } from 'src/iam/iam.constants'
import { ActiveMemberData } from 'src/iam/interfaces/active-member-data.interface'
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface'

@Injectable()
export class SocketAccessTokenGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            if (context.getType() !== 'ws') return true
            const socket = context.switchToWs().getClient()
            await SocketAccessTokenGuard.validateToken(socket)
            return true
        } catch (error) {
            console.log('error', error)

            return false
        }
    }

    private static extractWsToken(socket: Socket): string | undefined {
        return socket.handshake.auth.token
    }

    static async validateToken(socket: Socket): Promise<ActiveMemberData> {
        const token = this.extractWsToken(socket)
        const jwtService = new JwtService()
        const jwtConfiguration = jwtConfig()
        const payload = (await jwtService.verifyAsync(token, {
            secret: jwtConfiguration.secret,
            issuer: jwtConfiguration.issuer,
            audience: jwtConfiguration.audience,
        })) as ActiveMemberData
        socket.handshake.auth[REQUEST_MEMBER_KEY] = payload
        return payload
    }
}
