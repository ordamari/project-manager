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
import languages from '@/languages'
import useAppConfigStore from '@/store/app-config.store'
import Icon from '@/components/icon'
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
