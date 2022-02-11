import { MigrationInterface, QueryRunner } from "typeorm";

export class groupResolvers1587157137408 implements MigrationInterface {
  name = "groupResolvers1587157137408";

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `INSERT INTO "permission" ("name") VALUES
                                ('view:groups'),
                                ('create:groups')`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `DELETE FROM "permission" WHERE "name" IN
                            ('view:groups',
                             'create:groups')`,
      undefined
    );
  }
}
