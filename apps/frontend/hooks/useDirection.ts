import languages from '@/languages'
import useAppConfigStore from '@/store/app-config.store'
import { useEffect, useMemo } from 'react'

function useDirection() {
  const language = useAppConfigStore(state => state.language)
  const direction = useMemo(() => {
    return languages[language].direction
  }, [language])

  return direction as 'ltr' | 'rtl'
}

export default useDirection
