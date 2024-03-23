import useCompanyStore from '@company/store/company.store'
import { useMemo } from 'react'
import LoadCompanies from './load-companies'
import NoCompanies from './no-companies'
import CompanyItem from './company-item'
import { cn } from '@/@core/lib/utils'

type CompanyListProps = {
    className?: string
    itemClassName?: string
}

function CompanyList({ className, itemClassName }: CompanyListProps) {
    const companyList = useCompanyStore(state => state.list)
    const isHaveCompanies = useMemo(() => (companyList ?? []).length > 0, [companyList])
    const isLoad = useCompanyStore(state => state.isLoad)

    if (isLoad) return <LoadCompanies />

    if (!isHaveCompanies) {
        return <NoCompanies />
    }

    return (
        <ul className={cn('flex flex-col', className)}>
            {(companyList ?? []).map(company => (
                <li key={company.id}>
                    <CompanyItem company={company} className={itemClassName} />
                </li>
            ))}
        </ul>
    )
}

export default CompanyList
