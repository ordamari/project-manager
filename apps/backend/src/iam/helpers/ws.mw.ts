import { Socket } from 'socket.io'
import { SocketAccessTokenGuard } from '../guards/socket-access-token/socket-access-token.guard'

type SocketIOMiddleware = (socket: Socket, next: (err?: any) => void) => void

export const socketAuthMiddleware = (): SocketIOMiddleware => {
    return async (socket: Socket, next: (err?: any) => void) => {
        try {
            await SocketAccessTokenGuard.validateToken(socket)
            next()
        } catch (err) {
            next(err)
        }
    }
}
