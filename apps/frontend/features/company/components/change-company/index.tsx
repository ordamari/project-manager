'use client'
import AdvancedPopover from '@/@core/components/advanced-popover'
import useToggle from '@/@core/hooks/useToggle'
import useSelectedCompany from '../../hooks/useSelectedCompany'
import { Button } from '@/@core/components/ui/button'
import CompanyAvatar from '../company-avatar'
import CompanyList from '../company-list'
import { useEffect } from 'react'

function ChangeCompany() {
    const [isOpen, toggleIsOpen] = useToggle()
    const selectedCompany = useSelectedCompany()

    useEffect(() => {
        toggleIsOpen(false)
    }, [selectedCompany])

    if (!selectedCompany) return null
    return (
        <>
            <AdvancedPopover
                open={isOpen}
                onOpenChange={toggleIsOpen}
                trigger={{
                    children: <CompanyAvatar company={selectedCompany} />,
                }}
                content={{
                    children: (
                        <CompanyList
                            itemClassName='gap-2 hover:bg-primary-foreground p-2 rounded-md'
                            className='gap-2 '
                        />
                    ),
                }}
            />
        </>
    )
}
export default ChangeCompany
