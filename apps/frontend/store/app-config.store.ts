import { create } from 'zustand'
import languages from '@/languages'
import storageService from '@/services/storage.service'

type AppConfigStore = {
  darkMode: boolean
  language: keyof typeof languages
  toggleDarkMode: (isDarkMode: boolean) => void
  setLanguage: (language: keyof typeof languages) => void
}

const THEME_KEY = 'theme'
const LANGUAGE_KEY = 'language'

const useAppConfigStore = create<AppConfigStore>()(set => ({
  darkMode: storageService.get<boolean>(THEME_KEY) ?? false,
  language: storageService.get<keyof typeof languages>(LANGUAGE_KEY) ?? 'en',
  toggleDarkMode: (isDarkMode: boolean) => {
    storageService.set(THEME_KEY, isDarkMode)
    set(state => ({ darkMode: isDarkMode }))
  },
  setLanguage: language => {
    storageService.set(LANGUAGE_KEY, language)
    set({ language })
  }
}))

export default useAppConfigStore
