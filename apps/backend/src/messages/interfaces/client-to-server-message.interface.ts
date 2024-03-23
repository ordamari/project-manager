import { CreateDirectMessageDto } from '../dto/create-direct-message.dto'
import { CreateMessageCompanyDto } from '../dto/create-message-company.dto'

interface ClientToServerMessage {
    createMessageCompany: (messageDto: CreateMessageCompanyDto) => void
    createMessageDirect: (message: CreateDirectMessageDto) => void
}

export default ClientToServerMessage
