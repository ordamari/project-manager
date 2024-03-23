import http from '@core/lib/http'
import { Company } from '../types/company.type'
import { CreateCompanySchema } from '../schemas/create-company'
import ActiveMember from '../types/active-member.type'

class CompanyService {
    private static ENDPOINT = '/companies'

    public static async get(): Promise<Company[]> {
        const companies = await http.get(this.ENDPOINT)
        return companies
    }

    public static async getById(id: number): Promise<ActiveMember> {
        const activeMember = await http.get(`${this.ENDPOINT}/${id}`)
        return activeMember
    }

    public static async create(createCompanyData: CreateCompanySchema): Promise<Company> {
        const newCompany = await http.post(this.ENDPOINT, createCompanyData)
        return newCompany
    }

    public static async update(company: Company): Promise<Company> {
        const updatedCompany = await http.put(`${this.ENDPOINT}/${company.id}`, company)
        return updatedCompany
    }

    public static async delete(id: number): Promise<void> {
        await http.delete(`${this.ENDPOINT}/${id}`)
    }
}

export default CompanyService
