import {MigrationInterface, QueryRunner, Table, TableColumn} from "typeorm";
import { isNull } from "util";

export class createMiscellaneousTable1594207148754 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'miscellaneous',
            columns: [
              {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
              },
              {
                name: 'key',
                type: 'varchar',
                length: '500',
                isNullable: true
              },
              {
                name: 'value',
                type: 'text',
                isNullable: true
              },
              {
                name: 'created_at',
                type: 'datetime',
                default: 'CURRENT_TIMESTAMP',
              },
              {
                name: 'updated_at',
                type: 'datetime',
                default: 'CURRENT_TIMESTAMP',
              },
            ],
          }),
          true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('miscellaneous', true);
    }

}
