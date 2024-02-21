import useAppConfigStore from '@/store/app-config.store'
import { useCallback } from 'react'
import { translate } from '@/lib/utils'

function useTranslation() {
  const language = useAppConfigStore(state => state.language)
  const t = useCallback(
    (key: string) => {
      return translate(language, key)
    },
    [language]
  )
  return t
}

export default useTranslation
