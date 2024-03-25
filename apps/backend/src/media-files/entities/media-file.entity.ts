import { IsUrl } from 'class-validator'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class MediaFile {
    @PrimaryGeneratedColumn()
    id: number

    @IsUrl()
    @Column({
        unique: true,
    })
    url: string

    @Column()
    publicId: string
}
