import { create } from 'zustand'
import CompanyService from '../service/company.service'
import ActiveMember from '../types/active-member.type'

type ActiveMemberStore = {
    activeMember: ActiveMember | null
    load: (companyId: number) => Promise<void>
}

const useActiveMemberStore = create<ActiveMemberStore>()(set => ({
    activeMember: null,
    load: async (companyId: number) => {
        const activeMember = await CompanyService.getById(companyId)
        set({ activeMember })
    },
}))

export default useActiveMemberStore
