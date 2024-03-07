import { Company } from 'src/companies/entities/company.entity'
import { Member } from 'src/companies/entities/member.entity'
import { Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @JoinTable()
    @OneToMany(() => Member, member => member.user, { cascade: true })
    members: Member[]
}
