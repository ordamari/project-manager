import Icon from '@core/components/icon'
import { Button } from '@core/components/ui/button'
import useTranslation from '@core/hooks/useTranslation'
import useAppConfigStore from '@core/store/app-config.store'
import IconName from '@core/types/icon-name.type'
import themes from '@auth/lib/themes'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import { useMemo } from 'react'

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
