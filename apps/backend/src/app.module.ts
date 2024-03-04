import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { IamModule } from './iam/iam.module'
import { ConfigModule } from '@nestjs/config'
import { CompaniesModule } from './companies/companies.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DATABASE_HOST,
            port: +process.env.DATABASE_PORT,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            autoLoadEntities: true,
            synchronize: true,
            ssl: process.env.DATABASE_ENV === 'production',
        }),
        UsersModule,
        IamModule,
        CompaniesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
