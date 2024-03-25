import { CreateMessage } from '../../schemas/create-message.schema'
import Message from '../../types/message.type'
import MessageForm from './message-form'
import MessageList from './message-list'

type ChatProps = {
    messages: Message[]
    handleSubmit: (values: CreateMessage) => void
}

function Chat({ handleSubmit, messages }: ChatProps) {
    return (
        <div className='h-full flex flex-col w-full'>
            <div className='flex-grow overflow-auto p-4'>
                <MessageList messages={messages} />
            </div>
            <div className='flex-shrink-0 p-4'>
                <MessageForm onSubmit={handleSubmit} />
            </div>
        </div>
    )
}

export default Chat
