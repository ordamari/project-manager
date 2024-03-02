import { create } from 'zustand'
import User from '@/types/user.type'

type AuthStore = {
    loggedInUser: User | null
}

const useAuthStore = create<AuthStore>()(set => ({
    loggedInUser: null,
}))

export default useAuthStore
