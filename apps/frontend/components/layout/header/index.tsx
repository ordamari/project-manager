import { Button } from '@/components/ui/button'
import LanguageMenu from './language-menu'
import Icon from '@/components/icon'
import ThemeMenu from './theme-menu'
import Logo from '../logo'

type HeaderProps = {
  toggleIsNavbarOpen: () => void
}

function Header({ toggleIsNavbarOpen }: HeaderProps) {
  return (
    <header className='bg-primary-foreground z-10 flex justify-between px-2 py-2 border-b sticky top-0 backdrop-blur'>
      <div className='bg-primary-foreground'>
        <Button variant='link' className='2xl:hidden' onClick={toggleIsNavbarOpen}>
          <Icon className='w-5 h-5' name='menu' />
        </Button>
      </div>
      <div className='flex gap-1 flex-row-reverse items-center bg-primary-foreground'>
        <Logo className='text-center block zszs' />
        <LanguageMenu />
        <ThemeMenu />
      </div>
    </header>
  )
}

export default Header
