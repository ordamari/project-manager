import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'
import { SocketIoAdapter } from './socket-io-adapter'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(new ValidationPipe({}))
    app.use(cookieParser())
    app.enableCors({
        credentials: true,
        origin: process.env.CLIENT_ORIGIN,
    })
    app.useWebSocketAdapter(new SocketIoAdapter(app, process.env.CLIENT_ORIGIN))

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
