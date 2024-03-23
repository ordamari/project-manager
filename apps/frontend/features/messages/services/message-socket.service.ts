import { CreateMessage } from '../schemas/create-message.schema'
import appConfig from '@/@core/configs/app.config'
import useActiveMemberStore from '@/features/company/store/active-member.store'
import { Socket, io } from 'socket.io-client'

class MessageService {
    private static socket: Socket | null = null

    public static connect() {
        if (this.socket && this.socket.connected) this.socket.disconnect()
        const token = useActiveMemberStore.getState().activeMember?.memberAccessToken
        this.socket = io(`${appConfig.SOCKET_URL}/messages`, {
            auth: {
                token,
            },
        })
    }

    public static disconnect() {
        if (!this.socket) return
        this.socket.disconnect()
    }

    public static sendMessage(createMessage: CreateMessage) {
        if (!this.socket || !this.socket.connected) throw new Error('Socket not connected')
        this.socket.emit('create-message-company', createMessage)
    }
}

export default MessageService
