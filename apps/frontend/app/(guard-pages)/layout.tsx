'use client'

import { DirectionProvider } from '@radix-ui/react-direction'
import Header from '@/components/layout/header'
import Navbar from '@/components/layout/navbar'
import useToggle from '@/hooks/useToggle'
import useDirection from '@/hooks/useDirection'
import { useEffect } from 'react'
import useAppConfigStore from '@/store/app-config.store'
import { cn } from '@/lib/utils'

type GuardLayoutProps = {
  children: React.ReactNode
}

function GuardLayout({ children }: GuardLayoutProps) {
  const [isNavbarOpen, toggleIsNavbarOpen] = useToggle()
  const isDarkMode = useAppConfigStore(state => state.darkMode)
  const dir = useDirection()

  useEffect(() => {
    document.body.dir = dir
  }, [dir])

  return (
    <DirectionProvider dir={dir}>
      <div
        className={cn(
          'flex flex-row w-full h-screen flex-shrink-0 text-muted-foreground overflow-auto bg-primary-foreground',
          isDarkMode ? 'dark' : ''
        )}
      >
        <Navbar isOpen={isNavbarOpen} toggleIsOpen={toggleIsNavbarOpen} />
        <div className='flex-grow'>
          <Header toggleIsNavbarOpen={toggleIsNavbarOpen} />
          <main className='max-w-[1200px] m-auto py-4 flex flex-col gap-4 px-2'>{children}</main>
        </div>
      </div>
    </DirectionProvider>
  )
}

export default GuardLayout
