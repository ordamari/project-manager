import { Module } from '@nestjs/common'
import { UsersController } from './controllers/users.controller'
import { UsersService } from './services/users.service'
import { User } from './entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Member } from 'src/companies/entities/member.entity'

@Module({
    imports: [TypeOrmModule.forFeature([User, Member])],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
