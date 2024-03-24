import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common'
import { CompaniesService } from '../services/companies.service'
import { CreateCompanyDto } from '../dto/create-company.dto'
import { UpdateCompanyDto } from '../dto/update-company.dto'
import { ActiveUser } from 'src/iam/decorators/active-user.decorator'
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface'
import { ApiTags } from '@nestjs/swagger'
import { CompanyDataDto } from '../dto/company-data.dto'
import { AuthenticationService } from 'src/iam/services/authentication/authentication.service'
import { Response } from 'express'

@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
    constructor(
        private readonly companiesService: CompaniesService,
        private readonly authService: AuthenticationService
    ) {}

    @Post()
    create(@Body() createCompanyDto: CreateCompanyDto, @ActiveUser() user: ActiveUserData) {
        console.log('createCompanyDto', createCompanyDto)

        return this.companiesService.create(createCompanyDto, user)
    }

    @Get()
    findAll(@ActiveUser() user: ActiveUserData) {
        return this.companiesService.findAll(user)
    }

    @Get(':id')
    async findOne(
        @Res({ passthrough: true }) response: Response,
        @Param('id') id: string,
        @ActiveUser() user: ActiveUserData
    ): Promise<CompanyDataDto> {
        const data = await this.companiesService.findOne(Number(id), user)
        this.authService.addMemberTokenToCookie(response, data.memberAccessToken)
        return data
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.companiesService.remove(Number(id))
    }
}
