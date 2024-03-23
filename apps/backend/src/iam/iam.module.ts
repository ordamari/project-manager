import { Module } from '@nestjs/common'
import { BcryptService } from './services/hashing/bcrypt.service'
import { HashingService } from './services/hashing/hashing.service'
import { AuthenticationController } from './controllers/authentication/authentication.controller'
import { AuthenticationService } from './services/authentication/authentication.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/users/entities/user.entity'
import { JwtModule } from '@nestjs/jwt'
import jwtConfig from './config/jwt.config'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { AuthenticationGuard } from './guards/authentication/authentication.guard'
import { AccessTokenGuard } from './guards/access-token/access-token.guard'
import { RefreshTokenIdsStorage } from './storage/refresh-token-ids.storage/refresh-token-ids.storage'
import { RedisService } from 'src/redis/services/redis/redis.service'
import redisConfig from 'src/redis/config/redis.config'
import { SocketAccessTokenGuard } from './guards/socket-access-token/socket-access-token.guard'

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync(jwtConfig.asProvider()),
        ConfigModule.forFeature(redisConfig),
        ConfigModule.forFeature(jwtConfig),
    ],
    providers: [
        {
            provide: HashingService,
            useClass: BcryptService,
        },
        {
            provide: APP_GUARD,
            useClass: AuthenticationGuard,
        },
        AccessTokenGuard,
        AuthenticationService,
        RedisService,
        RefreshTokenIdsStorage,
    ],
    controllers: [AuthenticationController],
    exports: [],
})
export class IamModule {}
