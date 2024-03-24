import { create } from 'zustand'
import Message from '../types/message.type'
import MessageService from '../services/message.service'

type CompanyMessageStore = {
    list: Message[] | null
    clear: () => void
    load: () => Promise<void>
    add: (message: Message) => void
}

const useCompanyMessageStore = create<CompanyMessageStore>()(set => ({
    list: null,
    clear: () => set({ list: null }),
    load: async () => {
        const messages = await MessageService.getCompanyMessages()
        set({ list: messages })
    },
    add: message =>
        set(state => ({
            list: state.list ? [...state.list, message] : null,
        })),
}))

export default useCompanyMessageStore
