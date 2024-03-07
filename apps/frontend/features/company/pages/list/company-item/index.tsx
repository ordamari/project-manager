import { Company } from '@company/types/company.type'
import CompanyAvatar from '../company-avatar'

type CompanyItemProps = {
    company: Company
}

function CompanyItem({ company }: CompanyItemProps) {
    return (
        <div className='flex gap-4 items-center bg-primary-foreground p-4 rounded-md'>
            <CompanyAvatar company={company} />
            <span className='text-xl'>{company.name}</span>
        </div>
    )
}

export default CompanyItem
