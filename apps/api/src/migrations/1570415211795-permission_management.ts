import { MigrationInterface, QueryRunner } from "typeorm";

export class permissionManagement1570415211795 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "group" DROP CONSTRAINT "FK_adb912e10c347c8a1c9658dc4c4"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "user_groups_group" ("userId" uuid NOT NULL, "groupName" character varying NOT NULL, CONSTRAINT "PK_8796ed1c48c5f8ef4e45b6a8501" PRIMARY KEY ("userId", "groupName"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_84ff6a520aee2bf2512c01cf46" ON "user_groups_group" ("userId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_751f37a118fc90a14a56a229e2" ON "user_groups_group" ("groupName") `,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "group" DROP COLUMN "usersId"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "user_groups_group" ADD CONSTRAINT "FK_84ff6a520aee2bf2512c01cf462" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "user_groups_group" ADD CONSTRAINT "FK_751f37a118fc90a14a56a229e2f" FOREIGN KEY ("groupName") REFERENCES "group"("name") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    );

    await queryRunner.query(
      `INSERT INTO "permission" ("name") VALUES
                                ('create:events'),
                                ('delete:events'),
                                ('update:events'),
                                ('create:permissions'),
                                ('view:permissions'),
                                ('view:resumes'),
                                ('create:redemption_codes'),
                                ('view:redemption_codes'),
                                ('view:transactions'),
                                ('update:user_groups'),
                                ('update:user_permissions')`,
      undefined
    );

    await queryRunner.query(
      `INSERT INTO "group" ("name") VALUES ('Community Chair'),
                                           ('Community Event Manager')`,
      undefined
    );

    await queryRunner.query(
      `INSERT INTO "group_permissions_permission" ("groupName", "permissionName") VALUES
                                                  ('Community Chair', 'create:events'),
                                                  ('Community Chair', 'delete:events'),
                                                  ('Community Chair', 'update:events'),
                                                  ('Community Event Manager', 'create:events'),
                                                  ('Community Event Manager', 'delete:events'),
                                                  ('Community Event Manager', 'update:events')`,

      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "user_groups_group" DROP CONSTRAINT "FK_751f37a118fc90a14a56a229e2f"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "user_groups_group" DROP CONSTRAINT "FK_84ff6a520aee2bf2512c01cf462"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "group" ADD "usersId" uuid`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_751f37a118fc90a14a56a229e2"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_84ff6a520aee2bf2512c01cf46"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "user_groups_group"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "group" ADD CONSTRAINT "FK_adb912e10c347c8a1c9658dc4c4" FOREIGN KEY ("usersId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );

    await queryRunner.query(
      `DELETE FROM "group_permissions_permission" WHERE "groupName"='Community Chair';`,
      undefined
    );

    await queryRunner.query(
      `DELETE FROM "permission" WHERE "name" IN
                            ('create:events',
                             'delete:events',
                             'update:events',
                             'create:permissions',
                             'view:permissions',
                             'view:resumes',
                             'create:redemption_codes',
                             'view:redemption_codes',
                             'view:transactions',
                             'update:user_groups',
                             'update:user_permissions')`,
      undefined
    );

    await queryRunner.query(
      `DELETE FROM "group" WHERE "name" in ('Community Chair', 'Community Event Manager');`,
      undefined
    );
  }
}
