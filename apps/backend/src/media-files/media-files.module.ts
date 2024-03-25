import { Module } from '@nestjs/common'
import { CloudinaryService } from './services/cloudinary/cloudinary.service'
import { ConfigModule } from '@nestjs/config'
import cloudinaryConfig from './config/cloudinary.config'
import { MediaFilesService } from './services/media-files/media-files.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MediaFile } from './entities/media-file.entity'

@Module({
    imports: [ConfigModule.forFeature(cloudinaryConfig), TypeOrmModule.forFeature([MediaFile])],
    providers: [CloudinaryService, MediaFilesService],
    exports: [MediaFilesService, CloudinaryService],
})
export class MediaFilesModule {}
