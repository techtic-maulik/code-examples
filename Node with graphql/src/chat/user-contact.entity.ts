import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, BeforeInsert, ManyToOne } from "typeorm";
import { toSlug } from "../common/utils";
import { User } from "../user/user.entity";

@Entity()
export class UserContact {
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

    @Column({ type: 'datetime', nullable: true })
    last_sheen: Date;

    @Column("varchar", { length: 30, default: 'pending' })
    status: string;

    @Column("float", { nullable: true })
    unread: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}
