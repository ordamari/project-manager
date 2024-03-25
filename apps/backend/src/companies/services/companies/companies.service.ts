import { Injectable, NotFoundException } from '@nestjs/common'
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from 'src/users/entities/user.entity'
import { AuthenticationService } from 'src/iam/services/authentication/authentication.service'
import { Company } from 'src/companies/entities/company.entity'
import { Member } from 'src/companies/entities/member.entity'
import { CreateCompanyDto } from 'src/companies/dto/create-company.dto'
import { CompanyDataDto } from 'src/companies/dto/company-data.dto'

@Injectable()
export class CompaniesService {
    constructor(
        @InjectRepository(Company) private readonly companyRepository: Repository<Company>,
        @InjectRepository(Member) private readonly memberRepository: Repository<Member>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly authService: AuthenticationService
    ) {}

    async create(createCompanyDto: CreateCompanyDto, userData: ActiveUserData) {
        const user = await this.userRepository.findOne({ where: { id: userData.sub } })
        const member = await this.memberRepository.create({
            user,
        })
        const company = await this.companyRepository.create({
            ...createCompanyDto,
            members: [member],
        })
        return this.companyRepository.save(company)
    }

    async findAll(userData: ActiveUserData) {
        return await this.companyRepository.find({ where: { members: { user: { id: userData.sub } } } })
    }

    async findOne(id: number, userData: ActiveUserData): Promise<CompanyDataDto> {
        const company = await this.companyRepository.findOne({ where: { id }, relations: ['messages'] })
        if (!company) throw new NotFoundException(`Company #${id} not found`)
        const member = await this.memberRepository.findOne({
            where: { company: { id }, user: { id: userData.sub } },
            relations: ['company', 'user'],
        })
        if (!member) throw new NotFoundException(`You are not a member of company #${id}`)
        await this.userRepository.update({ id: userData.sub }, { lastUsedCompanyId: id })
        const memberAccessToken = await this.authService.createMemberAccessToken(member)
        return { memberAccessToken, company, memberId: member.id }
    }

    async remove(id: number) {
        return await this.companyRepository.delete({ id })
    }
}
