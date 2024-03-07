import { Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { Company } from './company.entity'
import { User } from 'src/users/entities/user.entity'

@Entity()
@Unique(['company', 'user'])
export class Member {
    @PrimaryGeneratedColumn()
    id: number

    @JoinTable()
    @ManyToOne(() => Company, company => company.members)
    company: Company

    @JoinTable()
    @ManyToOne(() => User, user => user.members)
    user: User
}
