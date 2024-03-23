import { Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { Company } from './company.entity'
import { User } from 'src/users/entities/user.entity'
import { Message } from 'src/messages/entities/message.entity'

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

    @JoinTable()
    @OneToMany(() => Message, message => message.sender)
    sendMessages: Message[]

    @JoinTable()
    @ManyToMany(() => Message, message => message.likedMembers)
    likedMessages: Message[]

    @JoinTable()
    @OneToMany(() => Message, message => message.receiverMember)
    receivedMessages: Message[]
}
