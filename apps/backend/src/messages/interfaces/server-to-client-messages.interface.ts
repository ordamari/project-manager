import { Message } from '../entities/message.entity'

interface ServerToClientMessage {
    receiveCompanyMessage: (message: Message) => void
    receiveDirectMessage: (message: Message) => void
}

export default ServerToClientMessage
