import http from '@core/lib/http'
import { SignInSchema } from '../schemas/sign-in.schema'
import { SignUpSchema } from '../schemas/sign-up.schema'
import User from '../types/user.type'

class AuthService {
    private static ENDPOINT = '/authentication'

    public static async signIn(signInData: SignInSchema): Promise<User> {
        const user = await http.post(`${this.ENDPOINT}/sign-in`, signInData)
        return user
    }

    public static async signUp(signUpData: SignUpSchema) {
        const res = await http.post(`${this.ENDPOINT}/sign-up`, signUpData)
    }

    public static async refreshTokens(): Promise<User> {
        const user = await http.post(`${this.ENDPOINT}/refresh-tokens`)
        return user
    }
}

export default AuthService
