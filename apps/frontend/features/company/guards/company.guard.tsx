'use client'
import { useEffect, useMemo } from 'react'
import useCompanyStore from '../store/company.store'
import { useRouter } from 'next/navigation'

type CompanyGuardProps = {
    children: React.ReactNode
}

function CompanyGuard({ children }: CompanyGuardProps) {
    const selectedId = useCompanyStore(state => state.selectedId)
    const loadCompanies = useCompanyStore(state => state.load)
    const list = useCompanyStore(state => state.list)
    const selected = useMemo(() => (list ?? []).find(company => company.id === selectedId), [list, selectedId])
    const router = useRouter()

    useEffect(() => {
        if (!selected) {
            if (!list) loadCompanies()
            else router.push('/company/list')
        }
    }, [selected, list])

    if (!selected) return null
    return <>{children}</>
}

export default CompanyGuard
