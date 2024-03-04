import http from '@core/lib/http'
import { Company } from '../types/company.type'

class CompanyService {
    private static ENDPOINT = '/company'

    public static async get(): Promise<Company[]> {
        const companies = await http.get(this.ENDPOINT)
        return companies
    }

    public static async getById(id: number): Promise<Company> {
        const company = await http.get(`${this.ENDPOINT}/${id}`)
        return company
    }

    public static async create(company: Company): Promise<Company> {
        const newCompany = await http.post(this.ENDPOINT, company)
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