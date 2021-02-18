import { MigrationInterface, QueryRunner, getRepository, Table, TableColumn } from "typeorm";
import { SportType } from "../sport-type/sport-type.entity";

export class SportType1568793309154 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.createTable(new Table({
            name: "sport_type",
            columns: [
                new TableColumn({ name: "_id", type: "varchar", length: '36', isPrimary: true, isGenerated: true, generationStrategy: 'uuid', isUnique: true }),
                new TableColumn({ name: "name", type: "varchar", length: '50' }),
                new TableColumn({ name: "slug", type: "varchar", isNullable: true, length: '50' }),
                new TableColumn({ name: "status", type: "varchar", isNullable: true, length: '20', default: "'active'" }),
                new TableColumn({ name: "created_at", type: "datetime" }),
                new TableColumn({ name: "updated_at", type: "datetime" }),
            ]
        }), true)


        await queryRunner.query("ALTER TABLE `sport_type` CHANGE `created_at` `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `sport_type` CHANGE `updated_at` `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");




        const repository = await getRepository(SportType);

        await repository.clear();
    
        await repository.save(new SportType({
            name: 'E-Gaming',
            status: 'active'
        }));

        await repository.save(new SportType({
            name: 'MLB',
            status: 'active'
        }));

        await repository.save(new SportType({
            name: 'MMA',
            status: 'active'
        }));

        await repository.save(new SportType({
            name: 'PGA',
            status: 'active'
        }));

        await repository.save(new SportType({
            name: 'NBA',
            status: 'active'
        }));

        await repository.save(new SportType({
            name: 'NFL',
            status: 'active'
        }));

        await repository.save(new SportType({
            name: 'NHL',
            status: 'active'
        }));
        
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        //const repository = await getRepository(SportType, 'seed');
         // .query(`DELETE FROM sport_types;`);


        await queryRunner.query("DROP TABLE `sport_type`");
    }

}
