import http from '@core/lib/http'
import { CreateMessage } from '../schemas/create-message.schema'
import Message from '../types/message.type'
import useCompanyMessageStore from '../store/company-messages.store'
import useActiveMemberStore from '@/features/company/store/active-member.store'

class MessageService {
    private static ENDPOINT = '/messages'

    public static async sendCompanyMessage(createMessageData: CreateMessage): Promise<void> {
        const message = await http.post(`${this.ENDPOINT}/company-message`, createMessageData)
    }

    public static async getCompanyMessages(): Promise<Message[]> {
        const companyId = useActiveMemberStore.getState().activeMember?.company.id

        const messages = await http.get(`${this.ENDPOINT}/company-messages`, { companyId })
        return messages
    }

    public static async onReceiveCompanyMessage(message: Message): Promise<void> {
        const addCompanyMessage = useCompanyMessageStore.getState().add
        addCompanyMessage(message)
    }
}

export default MessageService
