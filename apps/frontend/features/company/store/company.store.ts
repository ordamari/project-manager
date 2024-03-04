import { create } from 'zustand'
import { Company } from '../types/company.type'

type CompanyStore = {
    list: Company[]
}

const useCompanyStore = create<CompanyStore>()(set => ({
    list: [],
}))

export default useCompanyStore
