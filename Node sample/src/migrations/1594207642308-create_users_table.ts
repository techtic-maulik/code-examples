import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUsersTable1594207642308 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'users',
            columns: [
              {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
              },
              {
                name: 'first_name',
                type: 'varchar',
                length: '191',
                isNullable: true,
              },
              {
                name: 'last_name',
                type: 'varchar',
                length: '191',
                isNullable: true,
              },
              {
                name: 'email',
                type: 'varchar',
                length: '110',
                isNullable: true,
              },
              {
                name: 'password',
                type: 'varchar',
                length: '110',
                isNullable: true,
              },
              {
                name: 'apple_id',
                type: 'varchar',
                length: '191',
                isNullable: true,
              },
              {
                name: 'facebook_id',
                type: 'varchar',
                length: '191',
                isNullable: true,
              },
              {
                name: 'google_id',
                type: 'varchar',
                length: '191',
                isNullable: true,
              },
              {
                name: 'about',
                type: 'text',
                isNullable: true,
              },
              {
                name: 'learning_purpose',
                type: 'int',
                isNullable: true,
              },
              {
                name: 'quiz_level',
                type: 'int',
                isNullable: true,
              },
              {
                name: 'last_quiz_attended',
                type: 'date',
                isNullable: true,
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
        await queryRunner.dropTable('users', true);
    }

}

