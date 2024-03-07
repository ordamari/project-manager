import { Company } from '@/features/company/types/company.type'
import { Avatar, AvatarFallback, AvatarImage } from '@core/components/ui/avatar'
import { useMemo } from 'react'

type CompanyAvatarProps = {
    company: Company
}

function CompanyAvatar({ company }: CompanyAvatarProps) {
    const shortName = useMemo(() => {
        return company.name
            .split(' ')
            .map(word => word[0])
            .join('')
            .slice(0, 2)
            .toUpperCase()
    }, [company.name])

    return (
        <Avatar>
            <AvatarImage src={company.image} />
            <AvatarFallback>{shortName}</AvatarFallback>
        </Avatar>
    )
}

export default CompanyAvatar
