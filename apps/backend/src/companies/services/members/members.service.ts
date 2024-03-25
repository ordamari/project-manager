import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MemberDto } from 'src/companies/dto/member.dto'
import { Member } from 'src/companies/entities/member.entity'
import { ActiveMemberData } from 'src/iam/interfaces/active-member-data.interface'
import { MediaFilesService } from 'src/media-files/services/media-files/media-files.service'
import { Repository } from 'typeorm'

@Injectable()
export class MembersService {
    constructor(
        @InjectRepository(Member) private readonly memberRepository: Repository<Member>,
        private readonly mediaFilesService: MediaFilesService
    ) {}

    async uploadProfile(file: Express.Multer.File, activeMember: ActiveMemberData) {
        const member = await this.memberRepository.findOne({ where: { id: activeMember.sub } })
        if (!member) {
            throw new Error("Don't have active member")
        }
        const url = await this.mediaFilesService.uploadFile(file)
        if (member.profileUrl) {
            this.mediaFilesService.deleteFile(member.profileUrl)
        }
        member.profileUrl = url
        await this.memberRepository.save(member)
        return url
    }

    serialize(member: Member): MemberDto {
        const serializeMember = new MemberDto()
        serializeMember.id = member.id
        serializeMember.email = member.user.email
        return serializeMember
    }
}
