import { Company } from '@company/types/company.type'
import CompanyAvatar from '../../company-avatar'
import useCompanyStore from '@/features/company/store/company.store'
import { useRouter } from 'next/navigation'
import useAuthStore from '@/features/auth/store/auth.store'
import CompanyService from '@/features/company/service/company.service'
import { cn } from '@/@core/lib/utils'

type CompanyItemProps = {
    company: Company
    className?: string
}

function CompanyItem({ company, className }: CompanyItemProps) {
    const setLastUsedCompanyId = useAuthStore(state => state.setLastUsedCompanyId)
    const router = useRouter()
    const logged = useAuthStore(state => state.loggedInUser?.lastUsedCompanyId)

    const onSelectCompany = async () => {
        await CompanyService.getById(company.id)
        setLastUsedCompanyId(company.id)
        router.push('/')
    }

    return (
        <button onClick={onSelectCompany} className={cn('flex items-center w-full', className)}>
            <CompanyAvatar company={company} />
            <span>{company.name}</span>
        </button>
    )
}

export default CompanyItem
