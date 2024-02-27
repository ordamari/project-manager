import { User } from 'src/users/entities/user.entity'

export interface SignInData {
    user: User
    accessToken: string
    refreshToken: string
}
