import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, BeforeUpdate, BeforeInsert, AfterLoad } from "typeorm";
import { toSlug } from "../common/utils";

@Entity()
export class SportType {
    constructor(input?: any) {
        if (input) {
            Object.assign(this, input);
        }
    }
    @BeforeInsert()
    beforeInsert() {
        if (this.name) {
            this.slug = toSlug(this.name);
        }
    }
    
    // @BeforeUpdate()
    // beforeUpdate() {
    //     if (this){
    //         this.slug = toSlug(this.name);
    //     }
    // }

    // @AfterLoad()
    // updateCounters() {
    // }



    @PrimaryGeneratedColumn('uuid')
    _id: string;

    @Column("varchar", { length: 200, nullable: true })
    name: string;

    @Column("varchar", { length: 200, nullable: true })
    slug: string;

    @Column({ default: 'active'})
    status: 'active' | 'inactive';

    @Column("integer", { nullable: true })
    order_no: Number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}
