import { create } from 'zustand'
import languages from '../languages'
import StorageService from '../services/storage.service'

type AppConfigStore = {
    darkMode: boolean
    language: keyof typeof languages
    toggleDarkMode: (isDarkMode: boolean) => void
    setLanguage: (language: keyof typeof languages) => void
}

const useAppConfigStore = create<AppConfigStore>()(set => ({
    darkMode: StorageService.get<boolean>('theme') ?? false,
    language: StorageService.get<keyof typeof languages>('language') ?? 'en',
    toggleDarkMode: (isDarkMode: boolean) => {
        StorageService.set('theme', isDarkMode)
        set(state => ({ darkMode: isDarkMode }))
    },
    setLanguage: language => {
        StorageService.set('language', language)
        set({ language })
    },
}))

export default useAppConfigStore
