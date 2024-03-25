import { MemberDto } from 'src/companies/dto/member.dto'

export class MessageDto {
    id: number
    content: string
    sender: MemberDto
    createdAt: Date
}
