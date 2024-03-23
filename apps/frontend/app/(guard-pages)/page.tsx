'use client'
import MessageForm from '@/features/messages/components/message-form'
import { CreateMessage } from '@/features/messages/schemas/create-message.schema'
import MessageService from '@/features/messages/services/message-socket.service'

export default function Home() {
    function handleSubmit(message: CreateMessage) {
        MessageService.sendMessage(message)
    }

    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            <MessageForm onSubmit={handleSubmit} />
        </main>
    )
}
