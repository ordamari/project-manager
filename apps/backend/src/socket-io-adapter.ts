import { INestApplication } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IoAdapter } from '@nestjs/platform-socket.io'
import { ServerOptions } from 'socket.io'

export class SocketIoAdapter extends IoAdapter {
    constructor(
        private app: INestApplication,
        private clientOrigin: string
    ) {
        super(app)
    }

    createIOServer(port: number, options?: ServerOptions): any {
        const cors = {
            origin: this.clientOrigin,
            methods: ['GET', 'POST'],
            credentials: true,
        }

        const optionsWithCors = {
            ...options,
            cors,
        }

        return super.createIOServer(port, optionsWithCors)
    }
}
