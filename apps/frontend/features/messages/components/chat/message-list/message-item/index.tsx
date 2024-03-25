import FORMAT_DATE from '@/@core/constants/format-date.constant'
import Message from '@/features/messages/types/message.type'
import moment from 'moment'
type MessageItemProps = {
    message: Message
}

function MessageItem({ message }: MessageItemProps) {
    return (
        <div className=''>
            <div className=''>{moment(message.createdAt).format(FORMAT_DATE)}</div>
            <div className=''>{message.content}</div>
        </div>
    )
}

export default MessageItem
