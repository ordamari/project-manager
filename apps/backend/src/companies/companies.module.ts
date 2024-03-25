import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Company } from './entities/company.entity'
import { Member } from './entities/member.entity'
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
import { CompaniesService } from './services/companies/companies.service'
import { MediaFile } from 'src/media-files/entities/media-file.entity'
import cloudinaryConfig from 'src/media-files/config/cloudinary.config'
import { MediaFilesService } from 'src/media-files/services/media-files/media-files.service'
import { CloudinaryService } from 'src/media-files/services/cloudinary/cloudinary.service'
import { MembersService } from './services/members/members.service'
import { MembersController } from 'src/companies/controllers/members/members.controller'
import { CompaniesController } from './controllers/companies/companies.controller'

@Module({
    imports: [
        TypeOrmModule.forFeature([Company, Member, User, Message, MediaFile]),
        ConfigModule.forFeature(jwtConfig),
        ConfigModule.forFeature(cloudinaryConfig),
        ConfigModule.forFeature(redisConfig),
    ],
    controllers: [CompaniesController, MembersController],
    providers: [
        CompaniesService,
        MembersService,
        {
            provide: HashingService,
            useClass: BcryptService,
        },
        JwtService,
        RefreshTokenIdsStorage,
        RedisService,
        AuthenticationService,
        MediaFilesService,
        CloudinaryService,
    ],
})
export class CompaniesModule {}
