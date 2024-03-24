import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ActiveMember } from 'src/iam/decorators/active-member.decorator'
import { ActiveMemberData } from 'src/iam/interfaces/active-member-data.interface'
import { CreateMessageCompanyDto } from 'src/messages/dto/create-message-company.dto'
import { Message } from 'src/messages/entities/message.entity'
import { MessagesService } from 'src/messages/services/messages/messages.service'

@ApiTags('messages')
@Controller('messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) {}

    @Get('company-messages')
    async findCompanyMessages(@Query('companyId') companyId: number) {
        console.log('companyId', companyId)

        const messages = await this.messagesService.getCompanyMessages(companyId)
        return messages
    }

    @Post('company-message')
    async createCompanyMessage(
        @Body() createMessageDto: CreateMessageCompanyDto,
        @ActiveMember() memberData: ActiveMemberData
    ): Promise<Message> {
        const message = await this.messagesService.createMessageCompany(createMessageDto, memberData)
        return message
    }
}
