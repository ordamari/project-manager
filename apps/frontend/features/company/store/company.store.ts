import { create } from 'zustand'
import { Company } from '../types/company.type'
import CompanyService from '../service/company.service'

type CompanyStore = {
    isLoad: boolean
    list: Company[] | null
    selectedId: number
    load: () => Promise<void>
}

const useCompanyStore = create<CompanyStore>()(set => ({
    isLoad: false,
    list: null,
    selectedId: 0,
    load: async () => {
        set({ isLoad: true })
        const companies = await CompanyService.get()
        set({ list: companies, isLoad: false })
    },
}))

export default useCompanyStore
