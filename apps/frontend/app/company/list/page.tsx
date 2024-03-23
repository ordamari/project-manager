'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@core/components/ui/card'
import useTranslation from '@core/hooks/useTranslation'
import useCompanyStore from '@company/store/company.store'
import useOnLoad from '@core/hooks/useOnLoad'
import CompanyList from '@company/components/company-list'
import CompanyListFooter from '@company/components/company-list-footer'

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
                <CompanyList
                    className='gap-4 max-h-[400px] overflow-auto'
                    itemClassName='gap-4 bg-primary-foreground p-4 rounded-md text-xl'
                />
            </CardContent>
            <CardFooter>
                <CompanyListFooter />
            </CardFooter>
        </Card>
    )
}

export default CompaniesPage
