import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { UploadApiErrorResponse, UploadApiResponse, v2 as cloudinary } from 'cloudinary'
import cloudinaryConfig from 'src/media-files/config/cloudinary.config'

@Injectable()
export class CloudinaryService {
    constructor(
        @Inject(cloudinaryConfig.KEY)
        private cloudinaryConfiguration: ConfigType<typeof cloudinaryConfig>
    ) {
        cloudinary.config({
            cloud_name: this.cloudinaryConfiguration.cloudName,
            api_key: this.cloudinaryConfiguration.apiKey,
            api_secret: this.cloudinaryConfiguration.apiSecret,
        })
    }

    async uploadFile(file: Express.Multer.File): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
            const upload = cloudinary.uploader
                .upload_stream((error, result) => {
                    if (error) return reject(error)
                    resolve(result)
                })
                .end(file.buffer)
        })
    }

    async deleteFile(publicId: string) {
        return cloudinary.uploader.destroy(publicId)
    }
}
