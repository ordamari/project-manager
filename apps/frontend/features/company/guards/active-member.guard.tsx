'use client'
import { useEffect, useMemo } from 'react'
import useCompanyStore from '../store/company.store'
import { useRouter } from 'next/navigation'
import LoadPage from '@/features/layout/components/load-page'
import useAuthStore from '@/features/auth/store/auth.store'
import useSelectedCompany from '../hooks/useSelectedCompany'
import MessageService from '@/features/messages/services/message-socket.service'
import useActiveMemberStore from '../store/active-member.store'

type ActiveMemberGuardProps = {
    children: React.ReactNode
}

function ActiveMemberGuard({ children }: ActiveMemberGuardProps) {
    const loadCompanies = useCompanyStore(state => state.load)
    const list = useCompanyStore(state => state.list)
    const selected = useSelectedCompany()
    const activeMember = useActiveMemberStore(state => state.activeMember)
    const loadActiveMember = useActiveMemberStore(state => state.load)
    const router = useRouter()

    useEffect(() => {
        if (!selected) {
            if (!list) loadCompanies()
            else router.push('/company/list')
        } else {
            if (!activeMember) {
                loadActiveMember(selected.id)
            }
        }
    }, [selected, list, activeMember])

    useEffect(() => {
        if (activeMember) {
            console.log('Connecting to socket')

            MessageService.connect()
        } else {
            MessageService.disconnect()
        }
        return () => {
            MessageService.disconnect()
        }
    }, [activeMember])

    if (!activeMember) return <LoadPage />
    return <>{children}</>
}

export default ActiveMemberGuard
