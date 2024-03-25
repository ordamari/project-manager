import { Injectable } from '@nestjs/common'
import { CloudinaryService } from '../cloudinary/cloudinary.service'
import { InjectRepository } from '@nestjs/typeorm'
import { MediaFile } from 'src/media-files/entities/media-file.entity'
import { UploadApiErrorResponse } from 'cloudinary'
import { Repository } from 'typeorm'

@Injectable()
export class MediaFilesService {
    constructor(
        @InjectRepository(MediaFile) private readonly mediaFileRepository: Repository<MediaFile>,
        private readonly cloudinaryService: CloudinaryService
    ) {}

    async uploadFile(file: Express.Multer.File) {
        const res = await this.cloudinaryService.uploadFile(file)
        this.mediaFileRepository.save({ publicId: res.public_id, url: res.url })
        return res.url
    }

    async deleteFile(url: string) {
        const mediaFile = await this.mediaFileRepository.findOne({ where: { url } })
        if (!mediaFile) {
            throw new Error('File not found')
        }
        this.mediaFileRepository.delete(mediaFile)
        this.cloudinaryService.deleteFile(mediaFile.publicId)
    }
}
