'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@core/components/ui/card'
import useTranslation from '@core/hooks/useTranslation'
import useCompanyStore from '@/features/company/store/company.store'
import useOnLoad from '@core/hooks/useOnLoad'
import CompanyList from '@/features/company/pages/list/company-list'
import CompanyListFooter from '@/features/company/pages/list/company-list-footer'

function CompaniesPage() {
    const loadCompanies = useCompanyStore(state => state.load)
    const t = useTranslation()
    useOnLoad(loadCompanies)

    return (
        <Card className='w-[350px]'>
            <CardHeader>
                <CardTitle>{t('company.title')}</CardTitle>
                <CardDescription>{t('company.description')}</CardDescription>
            </CardHeader>
            <CardContent>
                <CompanyList />
            </CardContent>
            <CardFooter>
                <CompanyListFooter />
            </CardFooter>
        </Card>
    )
}

export default CompaniesPage
