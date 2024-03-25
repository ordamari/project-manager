import { Inject, Injectable, forwardRef } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MembersService } from 'src/companies/services/members/members.service'
import { ActiveMemberData } from 'src/iam/interfaces/active-member-data.interface'
import { CreateMessageCompanyDto } from 'src/messages/dto/create-message-company.dto'
import { MessageDto } from 'src/messages/dto/message.dto'
import { Message } from 'src/messages/entities/message.entity'
import { MessagesGateway } from 'src/messages/gateways/messages/messages.gateway'
import { Repository } from 'typeorm'

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Message) private readonly messageRepository: Repository<Message>,
        private readonly messagesGateway: MessagesGateway,
        private readonly membersService: MembersService
    ) {}

    async createMessageCompany(createMessageDto: CreateMessageCompanyDto, memberData: ActiveMemberData) {
        const message = await this.messageRepository.save({
            ...createMessageDto,
            sender: { id: memberData.sub },
            receiverCompany: { id: memberData.companyId },
        })
        this.messagesGateway.onReceiveCompanyMessage(message)
        return message
    }

    async getCompanyMessages(companyId: number) {
        const messages = await this.messageRepository.find({
            where: { receiverCompany: { id: companyId } },
            relations: ['sender', 'receiverCompany', 'sender.user'],
        })
        return messages.map(message => this.serialize(message))
    }

    findAll() {
        return `This action returns all messages`
    }

    findOne(id: number) {
        return `This action returns a #${id} message`
    }

    // update(id: number, updateMessageDto: UpdateMessageDto) {
    //     return `This action updates a #${id} message`
    // }

    remove(id: number) {
        return `This action removes a #${id} message`
    }

    serialize(message: Message): MessageDto {
        const serializedMessage = new MessageDto()
        serializedMessage.id = message.id
        serializedMessage.content = message.content
        serializedMessage.sender = this.membersService.serialize(message.sender)
        serializedMessage.createdAt = message.createdAt
        return serializedMessage
    }
}
