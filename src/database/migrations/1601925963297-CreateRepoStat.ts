import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateRepoStat1601925963297 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'repo_stats',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'id_repo',
              type: 'uuid',
            },
            {
              name: 'total_open_issues',
              type: 'integer',
              isNullable: true,
            },
            {
              name: 'avg_time_open_issues',
              type: 'numeric',
              isNullable: true,
            },
            {
              name: 'std_open_issues',
              type: 'numeric',
              isNullable: true,
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

      await queryRunner.createForeignKey(
        'repo_stats',
        new TableForeignKey({
          name: 'RepositoryId',
          columnNames: ['id_repo'],
          referencedColumnNames: ['id'],
          referencedTableName: 'repositories',
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        }),
      );

    }


    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('repo_stats', 'RepositoryId');
      await queryRunner.dropTable('repo_stats');
    }

}
