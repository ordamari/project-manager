import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface'
import { CreateMessageCompanyDto } from 'src/messages/dto/create-message-company.dto'
import { Message } from 'src/messages/entities/message.entity'
import { Repository } from 'typeorm'

@Injectable()
export class MessagesService {
    constructor(@InjectRepository(Message) private readonly messageRepository: Repository<Message>) {}

    async createMessageCompany(createMessageDto: CreateMessageCompanyDto, userData: ActiveUserData) {
        const message = await this.messageRepository.save({
            ...createMessageDto,
            sender: { id: userData.sub },
            sendToCompany: { id: createMessageDto.receiverCompanyId },
        })
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
