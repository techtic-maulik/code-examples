import { MigrationInterface, QueryRunner, TableColumn, Table, getRepository } from "typeorm";
import { User } from "../user/user.entity";
import { becrypt, randomInt, downloadFile } from "../common/utils";
import * as faker from 'faker';
import * as _ from 'underscore';

export class User1565050596778 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.createTable(new Table({
            name: "user",
            columns: [
                new TableColumn({ name: "_id", type: "varchar", length: '36', isPrimary: true, isGenerated: true, generationStrategy: 'uuid', isUnique: true }),
                new TableColumn({ name: "first_name", type: "varchar", length: '50' }),
                new TableColumn({ name: "last_name", type: "varchar", isNullable: true, length: '50' }),
                new TableColumn({ name: "email", type: "varchar", isNullable: true, length: '100' }),
                new TableColumn({ name: "password", type: "varchar", isNullable: true, length: '100' }),
                new TableColumn({ name: "email_verified_at", type: "datetime", isNullable: true }),
                new TableColumn({ name: "dob", type: "date", isNullable: true }),
                new TableColumn({ name: "gender", type: "varchar", isNullable: true, length: '20' }),
                new TableColumn({ name: "profile_pic", type: "varchar", isNullable: true, length: '100' }),
                new TableColumn({ name: "wallet_amount", type: "float", isNullable: true, default: 0 }),
                new TableColumn({ name: "status", type: "varchar", isNullable: true, length: '20', default: "'active'" }),
                new TableColumn({ name: "password_reset_token", type: "varchar", isNullable: true, length: '200' }),
                new TableColumn({ name: "password_reset_date", type: "datetime", isNullable: true }),
                new TableColumn({ name: "user_type", type: "varchar", isNullable: true, length: '20', default: "'user'" }),
                new TableColumn({ name: "created_at", type: "datetime" }),
                new TableColumn({ name: "updated_at", type: "datetime" }),
                //new TableColumn({ name: "deleted_at", type: "datetime", isNullable: true }),
            ]
        }), true);


        await queryRunner.query("ALTER TABLE `user` CHANGE `created_at` `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `user` CHANGE `updated_at` `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");

        const repository = await getRepository(User);

        await repository.clear();

        const admin = new User();
        admin.first_name = 'Admin';
        admin.last_name = 'User';
        admin.email = 'admin@gmail.com';
        admin.user_type = 'admin';
        admin.email_verified_at = new Date();
        admin.status = 'active';
        admin.dob = faker.date.past();
        admin.gender = faker.random.arrayElement(['male', 'female']);
        admin.profile_pic = await downloadFile(faker.image.avatar());
        admin.password = becrypt('admin@123');
        await repository.save(admin);

        const player = new User();
        player.first_name = 'Player';
        player.last_name = 'User';
        player.email = 'player@gmail.com';
        player.user_type = 'player';
        player.email_verified_at = new Date();
        player.status = 'active';
        player.dob = faker.date.past();
        player.gender = faker.random.arrayElement(['male', 'female']);
        player.profile_pic = await downloadFile(faker.image.avatar());
        player.password = becrypt('test@123');
        await repository.save(player);

        let user = new User();
        user.first_name = 'Test';
        user.last_name = 'User';
        user.email = 'user@gmail.com';
        user.user_type = 'user';
        user.email_verified_at = new Date();
        user.status = 'active';
        user.dob = faker.date.past();
        user.gender = faker.random.arrayElement(['male', 'female']);
        user.profile_pic = await downloadFile(faker.image.avatar());
        user.password = becrypt('test@123');
        user = await repository.save(user);




        let users: any[] = [];
        const type: string[] = ['user', 'player'];
        const status: string[] = ['active', 'inactive'];
        for (let index = 0; index < 20; index++) {
            let data = {
                first_name: faker.name.firstName(),
                last_name: faker.name.lastName(),
                email: faker.internet.email(),
                dob: faker.date.past(),
                gender: faker.random.arrayElement(['male', 'female']),
                password: becrypt('test@123'),
                profile_pic: await downloadFile(faker.image.avatar()),
                wallet_amount: randomInt(10000, 50000),
                email_verified_at: faker.date.past(),
                status: faker.random.arrayElement(status),
                user_type: faker.random.arrayElement(type)
            }

            users.push(data);
        }


        await repository.save(users);

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        //await queryRunner.dropTable("user");
        await queryRunner.query("DROP TABLE `user`");
    }

}
