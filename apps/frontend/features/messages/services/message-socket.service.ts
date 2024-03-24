import { CreateMessage } from '../schemas/create-message.schema'
import appConfig from '@/@core/configs/app.config'
import useActiveMemberStore from '@/features/company/store/active-member.store'
import ActiveMember from '@/features/company/types/active-member.type'
import { Socket, io } from 'socket.io-client'
import MessageService from './message.service'

class MessageSocketService {
    private static socket: Socket | null = null

    public static setup() {
        if (this.socket && this.socket.connected) this.socket.disconnect()
        const activeMember = useActiveMemberStore.getState().activeMember
        if (!activeMember) throw new Error('Active member not found')
        this.socket = io(`${appConfig.SOCKET_URL}/messages`, {
            auth: {
                token: activeMember.memberAccessToken ?? '',
            },
        })

        this.socket.on('receiveCompanyMessage', MessageService.onReceiveCompanyMessage)
    }

    public static disconnect() {
        if (!this.socket) return
        this.socket.disconnect()
    }
}

export default MessageSocketService
