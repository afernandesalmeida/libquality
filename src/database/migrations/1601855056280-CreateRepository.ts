import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateRepository1601855056280 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'repositories',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'id_repository',
              type: 'integer',
            },
            {
              name: 'name',
              type: 'varchar',
            },
            {
              name: 'full_name',
              type: 'varchar',
            },
            {
              name: 'html_url',
              type: 'varchar',
            },
            {
              name: 'issues_open_count',
              type: 'integer',
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'updated_at',
              type: 'varchar',
              default: 'now()',
            },
          ],
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('repositories');
    }

}
