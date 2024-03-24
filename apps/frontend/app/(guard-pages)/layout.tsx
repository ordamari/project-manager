'use client'

import useToggle from '@core/hooks/useToggle'
import Navbar from '@auth/components/layout/navbar'
import Header from '@auth/components/layout/header'
import ActiveMemberGuard from '@/features/company/guards/active-member.guard'
import AuthGuard from '@/features/auth/guards/auth.guard'
import ChangeCompany from '@/features/company/components/change-company'

type GuardLayoutProps = {
    children: React.ReactNode
}

function AuthGuardLayout({ children }: GuardLayoutProps) {
    return (
        <AuthGuard>
            <ActiveMemberGuard>
                <div className='flex bg-background w-full flex-col  md:flex-row'>
                    <div className='flex-shrink-0 p-2'>
                        <ChangeCompany />
                    </div>
                    <div className='flex-grow bg-primary-foreground rounded-md border-s'>{children}</div>
                </div>
            </ActiveMemberGuard>
        </AuthGuard>
    )
}

export default AuthGuardLayout
