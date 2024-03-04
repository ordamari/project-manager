'use client'

import useTranslation from '@core/hooks/useTranslation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@core/components/ui/card'
import SignInForm from '@auth/pages/sign-in/sign-in-form'
import NewAccount from '@/features/auth/pages/sign-in/new-account'

function SignIn() {
    const t = useTranslation()
    return (
        <Card className='w-[350px]'>
            <CardHeader>
                <CardTitle>{t('auth.sign-in')}</CardTitle>
                <CardDescription>{t('auth.sign-in-description')}</CardDescription>
            </CardHeader>
            <CardContent>
                <SignInForm />
            </CardContent>
            <CardFooter>
                <NewAccount />
            </CardFooter>
        </Card>
    )
}

export default SignIn
