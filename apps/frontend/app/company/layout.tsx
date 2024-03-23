import AuthGuard from '@/features/auth/guards/auth.guard'

type AuthLayoutProps = {
    children: React.ReactNode
}

function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <AuthGuard>
            <div className='w-full h-full flex items-center justify-center'>{children}</div>
        </AuthGuard>
    )
}

export default AuthLayout
