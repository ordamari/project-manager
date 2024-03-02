import Icon from '@core/components/icon'
import { Button } from '@core/components/ui/button'
import useTranslation from '@core/hooks/useTranslation'
import TNavItem from '@auth/types/nav-item.type'
import Link from 'next/link'

type NavItemProps = {
    navItem: TNavItem
    closeNavbar: () => void
}

function NavItem({ navItem: { name, icon, path }, closeNavbar }: NavItemProps) {
    const t = useTranslation()

    return (
        <li className='w-[300px]'>
            <Button variant='link'>
                <Link href={path} onClick={closeNavbar} className='full-width flex gap-1 items-center'>
                    <Icon className='w-8 ' name={icon} />
                    <span className='text-lg'>{t(name)}</span>
                </Link>
            </Button>
        </li>
    )
}

export default NavItem
