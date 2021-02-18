import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, AfterLoad } from 'typeorm';
import { Post } from '../post/post.entity';
import { baseUrl } from '../common/utils';
import { User } from '../user/user.entity';

@Entity()
export class Invoice {
    constructor(input?: any) {
        if (input) {
            Object.assign(this, input);
        }
    }
    @AfterLoad()
    afterLoad() {
        this.file = (this.file) ? baseUrl(this.file) : '';
    }

    @PrimaryGeneratedColumn('increment')
    _id: BigInteger;

    @Column("varchar", { nullable: true })
    transaction_id: string;

    @Column("varchar", { nullable: true })
    user_id: string;

    @Column("varchar", { nullable: true })
    post_id: string;

    @Column("float", { default: 0 })
    amount: number;

    @ManyToOne(type => Post, post => post.invoices)
    post: Post;

    @ManyToOne(type => User, user => user.invoices)
    user: User;

    @Column("varchar", { nullable: true })
    file_name: string;


    @Column("varchar", { length: 500, nullable: true })
    file: string;
    
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}