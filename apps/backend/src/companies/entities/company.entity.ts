import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Member } from './member.entity'

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @JoinTable()
    @OneToMany(() => Member, member => member.company, { cascade: true })
    members: Member[]
}
