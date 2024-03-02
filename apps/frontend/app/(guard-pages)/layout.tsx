'use client'

import useToggle from '@core/hooks/useToggle'
import Navbar from '@auth/components/layout/navbar'
import Header from '@auth/components/layout/header'

type GuardLayoutProps = {
    children: React.ReactNode
}

function GuardLayout({ children }: GuardLayoutProps) {
    const [isNavbarOpen, toggleIsNavbarOpen] = useToggle()

    return (
        <>
            <Navbar isOpen={isNavbarOpen} toggleIsOpen={toggleIsNavbarOpen} />
            <div className='flex-grow'>
                <Header toggleIsNavbarOpen={toggleIsNavbarOpen} />
                <main className='max-w-[1200px] m-auto py-4 flex flex-col gap-4 px-2'>{children}</main>
            </div>
        </>
    )
}

export default GuardLayout
