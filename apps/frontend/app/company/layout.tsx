type AuthLayoutProps = {
    children: React.ReactNode
}

function AuthLayout({ children }: AuthLayoutProps) {
    return <div className='w-full h-full flex items-center justify-center'>{children}</div>
}

export default AuthLayout
