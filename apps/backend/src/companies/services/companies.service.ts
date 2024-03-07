import { Injectable } from '@nestjs/common'
import { CreateCompanyDto } from '../dto/create-company.dto'
import { UpdateCompanyDto } from '../dto/update-company.dto'
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { Company } from '../entities/company.entity'
import { Repository } from 'typeorm'
import { Member } from '../entities/member.entity'
import { User } from 'src/users/entities/user.entity'

@Injectable()
export class CompaniesService {
    constructor(
        @InjectRepository(Company) private readonly companyRepository: Repository<Company>,
        @InjectRepository(Member) private readonly memberRepository: Repository<Member>,
        @InjectRepository(User) private readonly userRepository: Repository<User>
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

    findOne(id: number) {
        return `This action returns a #${id} company`
    }

    async remove(id: number) {
        return await this.companyRepository.delete({ id })
    }
}
