import useCompanyStore from '@company/store/company.store'
import NoCompanies from '../no-companies'
import CompanyItem from '../company-item'
import { useMemo } from 'react'
import LoadCompanies from '../load-companies'

function CompanyList() {
    const companyList = useCompanyStore(state => state.list)
    const isHaveCompanies = useMemo(() => (companyList ?? []).length > 0, [companyList])
    const isLoad = useCompanyStore(state => state.isLoad)

    if (isLoad) return <LoadCompanies />

    if (!isHaveCompanies) {
        return <NoCompanies />
    }

    return (
        <ul>
            {(companyList ?? []).map(company => (
                <li key={company.id}>
                    <CompanyItem company={company} />
                </li>
            ))}
        </ul>
    )
}

export default CompanyList
