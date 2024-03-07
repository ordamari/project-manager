'use client'

import useToggle from '@core/hooks/useToggle'
import Navbar from '@auth/components/layout/navbar'
import Header from '@auth/components/layout/header'
import AuthGuard from '@/features/auth/guards/auth-guard'
import CompanyGuard from '@/features/company/guards/company.guard'

type GuardLayoutProps = {
    children: React.ReactNode
}

function AuthGuardLayout({ children }: GuardLayoutProps) {
    const [isNavbarOpen, toggleIsNavbarOpen] = useToggle()

    return (
        <AuthGuard>
            <CompanyGuard>
                <Navbar isOpen={isNavbarOpen} toggleIsOpen={toggleIsNavbarOpen} />
                <div className='flex-grow'>
                    <Header toggleIsNavbarOpen={toggleIsNavbarOpen} />
                    <main className='max-w-[1200px] m-auto py-4 flex flex-col gap-4 px-2'>{children}</main>
                </div>
            </CompanyGuard>
        </AuthGuard>
    )
}

export default AuthGuardLayout
