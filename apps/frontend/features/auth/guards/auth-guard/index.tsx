'use client'
import { useEffect } from 'react'
import useAuthStore from '../../store/auth.store'
import AuthService from '../../services/auth.service'
import { useRouter } from 'next/navigation'

type AuthGuardProps = {
    children: React.ReactNode
}

function AuthGuard({ children }: AuthGuardProps) {
    const loggedInUser = useAuthStore(state => state.loggedInUser)
    const refreshTokens = useAuthStore(state => state.refreshTokens)
    const router = useRouter()

    useEffect(() => {
        const refreshToken = async () => {
            try {
                await refreshTokens()
            } catch (e) {
                router.push('/auth/sign-in')
            }
        }
        if (!loggedInUser) refreshToken()
    }, [loggedInUser])

    if (!loggedInUser) return null
    return children
}

export default AuthGuard
