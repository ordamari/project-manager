import { Module } from '@nestjs/common'
import { MessagesGateway } from './gateways/messages/messages.gateway'
import { MessagesService } from './services/messages/messages.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Company } from 'src/companies/entities/company.entity'
import { Member } from 'src/companies/entities/member.entity'
import { Message } from './entities/message.entity'
import { MessagesController } from './controllers/messages/messages.controller'
import { JwtModule, JwtService } from '@nestjs/jwt'
import jwtConfig from 'src/iam/config/jwt.config'
import { ConfigModule } from '@nestjs/config'
import { User } from 'src/users/entities/user.entity'
import { MembersService } from 'src/companies/services/members/members.service'
import { MediaFilesService } from 'src/media-files/services/media-files/media-files.service'
import { MediaFile } from 'src/media-files/entities/media-file.entity'
import cloudinaryConfig from 'src/media-files/config/cloudinary.config'
import { CloudinaryService } from 'src/media-files/services/cloudinary/cloudinary.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([Message, MediaFile, Member]),
        ConfigModule.forFeature(jwtConfig),
        ConfigModule.forFeature(cloudinaryConfig),
    ],
    controllers: [MessagesController],
    providers: [MessagesGateway, MessagesService, JwtService, MembersService, MediaFilesService, CloudinaryService],
    exports: [MessagesService, MessagesGateway, MembersService],
})
export class MessagesModule {}
