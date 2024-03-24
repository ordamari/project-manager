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
import { REQUEST_MEMBER_KEY } from 'src/iam/iam.constants'
import { ActiveMemberData } from 'src/iam/interfaces/active-member-data.interface'
import { Message } from 'src/messages/entities/message.entity'
import ClientToServerMessage from 'src/messages/interfaces/client-to-server-message.interface'
import ServerToClientMessage from 'src/messages/interfaces/server-to-client-messages.interface'

@WebSocketGateway({ namespace: 'messages' })
@UseGuards(SocketAccessTokenGuard)
export class MessagesGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly logger = new Logger(MessagesGateway.name)

    private receiveCompanyMessageRooms = (message: Message) => {
        return `company-${message.receiverCompany.id}`
    }

    private receiveDirectMessageRooms = (message: Message) => {
        return [`member-${message.sender.id}`, `member-${message.receiverMember.id}`]
    }

    private activeMemberRooms = (activeMemberData: ActiveMemberData) => {
        return [`member-${activeMemberData.sub}`, `company-${activeMemberData.companyId}`]
    }

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

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`)
        const activeMemberData: ActiveMemberData = client.handshake.auth[REQUEST_MEMBER_KEY]
        client.join(this.activeMemberRooms(activeMemberData))
    }

    onReceiveCompanyMessage(message: Message) {
        this.server.to(this.receiveCompanyMessageRooms(message)).emit('receiveCompanyMessage', message)
    }

    onReceiveDirectMessage(message: Message) {
        this.server.to(this.receiveDirectMessageRooms(message)).emit('receiveDirectMessage', message)
    }
}
