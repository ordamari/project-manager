'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@core/components/ui/card'
import useTranslation from '@core/hooks/useTranslation'
import SignUpForm from '@auth/pages/sign-up/sign-up-form'
import HaveAccount from '@auth/pages/sign-up/have-account'

function SignUp() {
    const t = useTranslation()
    return (
        <Card className='w-[350px]'>
            <CardHeader>
                <CardTitle>{t('auth.sign-up')}</CardTitle>
                <CardDescription>{t('auth.sign-up-description')}</CardDescription>
            </CardHeader>
            <CardContent>
                <SignUpForm />
            </CardContent>
            <CardFooter>
                <HaveAccount />
            </CardFooter>
        </Card>
    )
}

export default SignUp
