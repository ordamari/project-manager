'use client'

import { cn } from '@core/lib/utils'
import NavigationList from './navigation-list'
import { useMemo } from 'react'
import { Button } from '@core/components/ui/button'
import Icon from '@core/components/icon'
import Logo from '@core/components/layout/logo'
import navigation from '@auth/lib/navigation'

type NavbarProps = {
    isOpen: boolean
    toggleIsOpen: (value?: any) => void
}

function Navbar({ isOpen, toggleIsOpen }: NavbarProps) {
    const { width, boxShadow } = useMemo(() => {
        const width = isOpen ? 'w-[300px]' : 'w-0'
        const boxShadow = isOpen ? 'shadow-lg' : 'shadow-none'
        return { width, boxShadow }
    }, [isOpen])

    return (
        <>
            {/* <div
        onClick={toggleIsOpen}
        className={cn(isOpen ? 'block' : 'hidden', '2xl:hidden', 'absolute w-full h-full cursor-pointer')}
      /> */}
            <nav
                className={cn(
                    boxShadow,
                    width,
                    'bg-primary-foreground h-full fixed 2xl:sticky top-0 2xl:w-[300px] overflow-hidden transition-all border-e z-20'
                )}
            >
                <div className='px-2 py-2'>
                    <div className='flex flex-row-reverse'>
                        <Button variant='link' className='2xl:hidden self-end' onClick={toggleIsOpen}>
                            <Icon className='w-5 h-5' name='close' />
                        </Button>
                    </div>
                    <Logo className='py-2' />
                    <NavigationList navigation={navigation} closeNavbar={toggleIsOpen.bind(null, false)} />
                </div>
            </nav>
        </>
    )
}

export default Navbar
