import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { REQUEST_MEMBER_KEY } from '../iam.constants'
import { ActiveMemberData } from '../interfaces/active-member-data.interface'

export const ActiveMember = createParamDecorator((field: keyof ActiveMemberData | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const activeMemberData: ActiveMemberData | undefined = request[REQUEST_MEMBER_KEY]
    if (!activeMemberData) throw new Error('Active member data is missing')
    return field ? activeMemberData[field] : activeMemberData
})
