'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/@core/components/ui/card'
import useTranslation from '@/@core/hooks/useTranslation'
import CreateCompanyForm from '@/features/company/components/create-company-form'

function CreateCompany() {
    const t = useTranslation()
    return (
        <Card className='w-[350px]'>
            <CardHeader>
                <CardTitle>{t('company.create-title')}</CardTitle>
                <CardDescription>{t('company.create-description')}</CardDescription>
            </CardHeader>
            <CardContent>
                <CreateCompanyForm />
            </CardContent>
        </Card>
    )
}

export default CreateCompany
