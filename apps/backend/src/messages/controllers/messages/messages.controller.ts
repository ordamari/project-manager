import { Controller, Get, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { MessagesService } from 'src/messages/services/messages/messages.service'

@ApiTags('messages')
@Controller('messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) {}

    @Get('company-messages')
    async findCompanyMessages(@Param('companyId') companyId: number) {
        const messages = await this.messagesService.getCompanyMessages(companyId)
        return messages
    }
}
