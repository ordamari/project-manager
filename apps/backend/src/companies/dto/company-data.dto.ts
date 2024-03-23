import { Company } from '../entities/company.entity'

export class CompanyDataDto {
    memberAccessToken: string
    company: Company
}
