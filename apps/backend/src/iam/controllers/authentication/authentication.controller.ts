import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'
import { Auth } from 'src/iam/decorators/auth.decorator'
import { SignInDto } from 'src/iam/dto/sign-in.dto'
import { SignUpDto } from 'src/iam/dto/sign-up.dto'
import { AuthType } from 'src/iam/enums/auth-type.enum'
import { AuthenticationService } from 'src/iam/services/authentication/authentication.service'

@Auth(AuthType.None)
@Controller('authentication')
export class AuthenticationController {
    constructor(private readonly authService: AuthenticationService) {}

    @Post('sign-up')
    signUp(@Body() signUpDto: SignUpDto) {
        return this.authService.signUp(signUpDto)
    }

    @HttpCode(HttpStatus.OK)
    @Post('sign-in')
    async signIn(@Res({ passthrough: true }) response: Response, @Body() signInDto: SignInDto) {
        const { accessToken, refreshToken, user } = await this.authService.signIn(signInDto)
        this.authService.addTokenToCookie(response, accessToken, refreshToken)
        return user
    }

    @HttpCode(HttpStatus.OK)
    @Post('refresh-tokens')
    async refreshTokens(@Res({ passthrough: true }) response: Response, @Req() request: Request) {
        const { accessToken, refreshToken, user } = await this.authService.refreshTokens(request)
        this.authService.addTokenToCookie(response, accessToken, refreshToken)
        return user
    }
}
