import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        })
    )
    app.use(cookieParser())
    app.enableCors({
        credentials: true,
        origin: process.env.CORS_ORIGIN,
    })

    const options = new DocumentBuilder()
        .setTitle('Project Management API')
        .setDescription('The Project Management API description')
        .setVersion('1.0')
        .build()

    const document = SwaggerModule.createDocument(app, options)

    SwaggerModule.setup('api', app, document)

    await app.listen(3000)
}
bootstrap()
