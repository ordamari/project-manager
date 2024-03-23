import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Member } from './member.entity'
import { Message } from 'src/messages/entities/message.entity'

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @JoinTable()
    @OneToMany(() => Member, member => member.company, { cascade: true })
    members: Member[]

    @JoinTable()
    @OneToMany(() => Message, message => message.receiverCompany)
    messages: Message[]
}
