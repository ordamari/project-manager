import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { CompaniesService } from '../services/companies.service'
import { CreateCompanyDto } from '../dto/create-company.dto'
import { UpdateCompanyDto } from '../dto/update-company.dto'
import { ActiveUser } from 'src/iam/decorators/active-user.decorator'
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService) {}

    @Post()
    create(@Body() createCompanyDto: CreateCompanyDto, @ActiveUser() user: ActiveUserData) {
        return this.companiesService.create(createCompanyDto, user)
    }

    @Get()
    findAll(@ActiveUser() user: ActiveUserData) {
        return this.companiesService.findAll(user)
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.companiesService.findOne(id)
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.companiesService.remove(id)
    }
}
