import Icon from '@core/components/icon'
import { Button } from '@core/components/ui/button'
import useTranslation from '@core/hooks/useTranslation'
import languages from '@core/languages'
import useAppConfigStore from '@core/store/app-config.store'
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

export function LanguageMenu() {
    const t = useTranslation()
    const languagesKeys = useMemo(() => Object.keys(languages) as (keyof typeof languages)[], [languages])
    const setLanguage = useAppConfigStore(state => state.setLanguage)
    const language = useAppConfigStore(state => state.language)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='link'>
                    <Icon className='w-5 h-5' name='language' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
                <DropdownMenuLabel>{t('general.language')}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {languagesKeys.map(languageKey => {
                        return (
                            <DropdownMenuItem
                                disabled={languageKey === language}
                                onClick={() => setLanguage(languageKey)}
                                key={languageKey}
                            >
                                <span>{t(`languages.${languageKey}`)}</span>
                            </DropdownMenuItem>
                        )
                    })}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default LanguageMenu
