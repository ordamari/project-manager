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

@Module({
    imports: [TypeOrmModule.forFeature([Company, Member, Message]), ConfigModule.forFeature(jwtConfig)],
    controllers: [MessagesController],
    providers: [MessagesGateway, MessagesService, JwtService],
})
export class MessagesModule {}
