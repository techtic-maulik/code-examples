import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class Message {
    constructor(input?: any) {
        if (input) {
            Object.assign(this, input);
        }
    }

    // @BeforeInsert()
    // beforeInsert() {
    //     if (this.name) {
    //         this.slug = toSlug(this.name);
    //     }
    // }


    @PrimaryGeneratedColumn('uuid')
    _id: string;

    @Column("varchar", { length: 36 })
    user_id: string;

    @ManyToOne(type => User, user => user.sentMesssages)
    user: User;

    @Column("varchar", { length: 36 })
    contact_id: string;

    @ManyToOne(type => User, user => user.revicedMessages)
    contact: User;

    @Column({ type: 'varchar', length: 2000, nullable: true })
    message: string;

    @Column({ type: 'varchar', length: 2000, nullable: true })
    data: string;

    @Column("varchar", { length: 30, default: 'sent' })
    status: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}
