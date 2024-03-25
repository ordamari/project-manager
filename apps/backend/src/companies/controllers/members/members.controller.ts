import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { MembersService } from 'src/companies/services/members/members.service'
import { ActiveMember } from 'src/iam/decorators/active-member.decorator'
import { ActiveMemberData } from 'src/iam/interfaces/active-member-data.interface'

@Controller('members')
export class MembersController {
    constructor(private readonly membersService: MembersService) {}
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @ActiveMember() activeMember: ActiveMemberData) {
        const url = await this.membersService.uploadProfile(file, activeMember)
        return { url }
    }
}
