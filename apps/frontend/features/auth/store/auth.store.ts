import { create } from 'zustand'
import User from '../types/user.type'
import { SignInSchema } from '../schemas/sign-in.schema'
import AuthService from '../services/auth.service'
import { SignUpSchema } from '../schemas/sign-up.schema'

type AuthStore = {
    loggedInUser: User | null
    signIn: (signInData: SignInSchema) => Promise<void>
    refreshTokens: () => Promise<void>
    signUp: (signUpData: SignUpSchema) => Promise<void>
}

const useAuthStore = create<AuthStore>()(set => ({
    loggedInUser: null,
    signIn: async signInData => {
        const user = await AuthService.signIn(signInData)
        set({ loggedInUser: user })
    },
    refreshTokens: async () => {
        const user = await AuthService.refreshTokens()
        set({ loggedInUser: user })
    },
    signUp: async signUpData => {
        await AuthService.signUp(signUpData)
    },
}))

export default useAuthStore
