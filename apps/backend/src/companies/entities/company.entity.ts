import { User } from 'src/users/entities/user.entity'
import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
}
