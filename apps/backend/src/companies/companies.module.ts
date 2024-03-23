import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Company } from './entities/company.entity'
import { Member } from './entities/member.entity'
import { CompaniesController } from './controllers/companies.controller'
import { CompaniesService } from './services/companies.service'
import { User } from 'src/users/entities/user.entity'
import { Message } from 'src/messages/entities/message.entity'
import { AuthenticationService } from 'src/iam/services/authentication/authentication.service'
import { ConfigModule } from '@nestjs/config'
import jwtConfig from 'src/iam/config/jwt.config'
import { BcryptService } from 'src/iam/services/hashing/bcrypt.service'
import { HashingService } from 'src/iam/services/hashing/hashing.service'
import { JwtService } from '@nestjs/jwt'
import { RefreshTokenIdsStorage } from 'src/iam/storage/refresh-token-ids.storage/refresh-token-ids.storage'
import { RedisService } from 'src/redis/services/redis/redis.service'
import redisConfig from 'src/redis/config/redis.config'

@Module({
    imports: [
        TypeOrmModule.forFeature([Company, Member, User, Message]),
        ConfigModule.forFeature(jwtConfig),
        ConfigModule.forFeature(redisConfig),
    ],
    controllers: [CompaniesController],
    providers: [
        CompaniesService,
        {
            provide: HashingService,
            useClass: BcryptService,
        },
        JwtService,
        RefreshTokenIdsStorage,
        RedisService,
        AuthenticationService,
    ],
})
export class CompaniesModule {}
