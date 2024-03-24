import { Company } from 'src/companies/entities/company.entity'
import { Member } from 'src/companies/entities/member.entity'
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @Column({ default: false })
    isDeleted: boolean

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date

    @JoinTable()
    receiverMember: Member

    @JoinTable()
    @ManyToOne(() => Company, company => company.messages, { cascade: true, nullable: true })
    receiverCompany: Company

    @JoinTable()
    @OneToMany(() => Message, message => message.originalVersion)
    editedVersions: Message[]

    @JoinTable()
    @ManyToOne(() => Message, message => message.editedVersions, { cascade: true, nullable: true })
    originalVersion: Message

    @JoinTable()
    @OneToMany(() => Message, message => message.parent)
    replies: Message[]

    @JoinTable()
    @ManyToOne(() => Message, message => message.replies, { cascade: true, nullable: true })
    parent: Message

    @JoinTable()
    @JoinTable()
    @ManyToOne(() => Member, member => member.sendMessages, { cascade: true })
    sender: Member

    @JoinTable()
    @ManyToMany(() => Member, member => member.likedMessages, { cascade: true })
    likedMembers: Member[]
}
