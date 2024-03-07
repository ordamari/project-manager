import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Company } from './entities/company.entity'
import { Member } from './entities/member.entity'
import { CompaniesController } from './controllers/companies.controller'
import { CompaniesService } from './services/companies.service'
import { User } from 'src/users/entities/user.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Company, Member, User])],
    controllers: [CompaniesController],
    providers: [CompaniesService],
})
export class CompaniesModule {}
