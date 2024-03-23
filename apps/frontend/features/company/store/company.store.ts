import { create } from 'zustand'
import { Company } from '../types/company.type'
import CompanyService from '../service/company.service'
import { CreateCompanySchema } from '../schemas/create-company'

type CompanyStore = {
    isLoad: boolean
    list: Company[] | null
    load: () => Promise<void>
    create: (createCompanyData: CreateCompanySchema) => Promise<void>
}

const useCompanyStore = create<CompanyStore>()(set => ({
    isLoad: false,
    list: null,
    load: async () => {
        set({ isLoad: true })
        const companies = await CompanyService.get()
        set({ list: companies, isLoad: false })
    },
    create: async (createCompanyData: CreateCompanySchema) => {
        const company = await CompanyService.create(createCompanyData)
        set(state => ({ list: state.list ? [...state.list, company] : [company], selectedId: company.id }))
    },
}))

export default useCompanyStore
