import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { Auth } from './iam/decorators/auth.decorator'
import { AuthType } from './iam/enums/auth-type.enum'
import { ApiTags } from '@nestjs/swagger'

ApiTags('ping')
@Auth(AuthType.None)
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello()
    }
}
