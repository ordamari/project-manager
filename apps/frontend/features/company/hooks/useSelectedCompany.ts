import useAuthStore from '@/features/auth/store/auth.store'
import useCompanyStore from '../store/company.store'
import { useMemo } from 'react'

function useSelectedCompany() {
    const companies = useCompanyStore(state => state.list)
    const loggedInUser = useAuthStore(state => state.loggedInUser)
    const selectedCompany = useMemo(
        () => (companies ?? []).find(company => company.id === loggedInUser?.lastUsedCompanyId),
        [companies, loggedInUser]
    )
    return selectedCompany
}

export default useSelectedCompany
