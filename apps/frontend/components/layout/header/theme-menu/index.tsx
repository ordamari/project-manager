import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { useMemo } from 'react'
import useTranslation from '@/hooks/useTranslation'
import useAppConfigStore from '@/store/app-config.store'
import Icon from '@/components/icon'
import themes from '@/lib/themes'
import IconName from '@/types/icon-name.type'

export function ThemeMenu() {
  const t = useTranslation()
  const toggleDarkMode = useAppConfigStore(state => state.toggleDarkMode)
  const isDarkMode = useAppConfigStore(state => state.darkMode)
  const iconName: IconName = useMemo(() => (isDarkMode ? 'dark' : 'light'), [isDarkMode])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='link'>
          <Icon className='w-5 h-5' name={iconName} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>{t('general.theme')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {themes.map(theme => {
            return (
              <DropdownMenuItem
                disabled={theme.isDarkMode === isDarkMode}
                onClick={() => toggleDarkMode(theme.isDarkMode)}
                key={theme.name}
              >
                <span>{t(`theme.${theme.name}`)}</span>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ThemeMenu
