import { MigrationInterface, QueryRunner } from "typeorm";

export class newPermissions1587154196777 implements MigrationInterface {
  name = "newPermissions1587154196777";

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `INSERT INTO "permission" ("name") VALUES
                                ('update:user_expiration_date'),
                                ('reset:user_shirt_received'),
                                ('update:user_shirt_received')`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `DELETE FROM "permission" WHERE "name" IN
                            ('update:user_expiration_date',
                             'reset:user_shirt_received',
                             'update:user_shirt_received')`,
      undefined
    );
  }
}
