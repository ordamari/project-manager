import { useMemo } from "react"
import useAppConfigStore from "../store/app-config.store"
import languages from "../languages"

function useDirection() {
  const language = useAppConfigStore(state => state.language)
  const direction = useMemo(() => {
    return languages[language].direction
  }, [language])

  return direction as 'ltr' | 'rtl'
}

export default useDirection
