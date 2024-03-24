import { Company } from './company.type'

type ActiveMember = {
    memberId: number
    company: Company
    memberAccessToken: string
}

export default ActiveMember
