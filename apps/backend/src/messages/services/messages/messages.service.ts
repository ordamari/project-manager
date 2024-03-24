import { Inject, Injectable, forwardRef } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ActiveMemberData } from 'src/iam/interfaces/active-member-data.interface'
import { CreateMessageCompanyDto } from 'src/messages/dto/create-message-company.dto'
import { Message } from 'src/messages/entities/message.entity'
import { MessagesGateway } from 'src/messages/gateways/messages/messages.gateway'
import { Repository } from 'typeorm'

@Injectable()
export class MessagesService {
    constructor(
        private readonly messagesGateway: MessagesGateway,
        @InjectRepository(Message) private readonly messageRepository: Repository<Message>
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
        })
        return messages
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
}
