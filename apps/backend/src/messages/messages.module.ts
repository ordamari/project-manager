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

@Module({
    imports: [TypeOrmModule.forFeature([Message]), ConfigModule.forFeature(jwtConfig)],
    controllers: [MessagesController],
    providers: [MessagesGateway, MessagesService, JwtService],
    exports: [MessagesService, MessagesGateway],
})
export class MessagesModule {}
