import { Company } from 'src/companies/entities/company.entity'
import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    email: string

    @Column()
    password: string
}
