'use client'

import { cn } from "../lib/utils"
import useAppConfigStore from "../store/app-config.store"

type ThemeProviderProps = {
    children: React.ReactNode
    className?: string
}

function ThemeProvider({ children, className }: ThemeProviderProps) {
  const isDarkMode = useAppConfigStore(state => state.darkMode)

    return  <div
    className={cn(
      className,
      isDarkMode ? 'dark' : ''
    )}
  >
    
    {children}
  </div>
}

export default ThemeProvider