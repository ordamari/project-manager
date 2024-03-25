'use client'
import useActiveMemberStore from '@/features/company/store/active-member.store'
import Chat from '@/features/messages/components/chat'
import MessageForm from '@/features/messages/components/chat/message-form'
import { CreateMessage } from '@/features/messages/schemas/create-message.schema'
import MessageService from '@/features/messages/services/message.service'
import useCompanyMessageStore from '@/features/messages/store/company-messages.store'
import { useEffect } from 'react'

export default function Home() {
    const messages = useCompanyMessageStore(state => state.list)
    const loadMessages = useCompanyMessageStore(state => state.load)
    const clearMessages = useCompanyMessageStore(state => state.clear)
    const company = useActiveMemberStore(state => state.activeMember?.company)

    useEffect(() => {
        loadMessages()
        return () => {
            clearMessages()
        }
    }, [company])

    function handleSubmit(message: CreateMessage) {
        MessageService.sendCompanyMessage(message)
    }

    if (!messages) return null
    return (
        <main className='flex h-screen flex-col items-center  w-full'>
            <Chat handleSubmit={handleSubmit} messages={messages} />
        </main>
    )
}
