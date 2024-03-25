import Message from '@/features/messages/types/message.type'
import MessageItem from './message-item'

type MessageListProps = {
    messages: Message[]
}

function MessageList({ messages }: MessageListProps) {
    return (
        <ul className='flex flex-col'>
            {messages.map(message => {
                return (
                    <li key={message.id} className=''>
                        <MessageItem message={message} />
                    </li>
                )
            })}
        </ul>
    )
}

export default MessageList
