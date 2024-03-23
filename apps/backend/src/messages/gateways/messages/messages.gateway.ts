import { Logger, UseGuards } from '@nestjs/common'
import {
    WebSocketGateway,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { SocketAccessTokenGuard } from 'src/iam/guards/socket-access-token/socket-access-token.guard'
import { socketAuthMiddleware } from 'src/iam/helpers/ws.mw'
import { CreateMessageCompanyDto } from 'src/messages/dto/create-message-company.dto'
import ClientToServerMessage from 'src/messages/interfaces/client-to-server-message.interface'
import ServerToClientMessage from 'src/messages/interfaces/server-to-client-messages.interface'
import { MessagesService } from 'src/messages/services/messages/messages.service'

@WebSocketGateway({ namespace: 'messages' })
@UseGuards(SocketAccessTokenGuard)
export class MessagesGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly logger = new Logger(MessagesGateway.name)
    constructor(private readonly messagesService: MessagesService) {}

    @WebSocketServer()
    server: Server<ClientToServerMessage, ServerToClientMessage>

    afterInit(client: Socket) {
        this.logger.log('WebSocket Gateway Initialized')
        client.use(socketAuthMiddleware() as any)
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`)
        // throw new Error('Method not implemented.')
    }

    handleConnection(client: any, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`)
        // throw new Error('Method not implemented.')
    }

    @SubscribeMessage('create-message-company')
    async createMessageCompany(@MessageBody() createMessageCompanyDto: CreateMessageCompanyDto) {
        this.logger.log(`Create message: ${createMessageCompanyDto}`)
        // const message = await this.messagesService.createMessageCompany(createMessageCompanyDto, userData)
        // return message
    }
}
