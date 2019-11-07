import { MigrationInterface, QueryRunner } from "typeorm";

export class permissionRedemptionCodes1570902759792
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "redemption_code_permissions_permission" ("redemptionCodeId" character varying NOT NULL, "permissionName" character varying NOT NULL, CONSTRAINT "PK_db57f88686755ec8a7b1622824c" PRIMARY KEY ("redemptionCodeId", "permissionName"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bd154e39992640cd88f2cf875e" ON "redemption_code_permissions_permission" ("redemptionCodeId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0c18f467e7118a23f9609acf42" ON "redemption_code_permissions_permission" ("permissionName") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "redemption_code_groups_group" ("redemptionCodeId" character varying NOT NULL, "groupName" character varying NOT NULL, CONSTRAINT "PK_a30cdddf87599197a7a8d85dabd" PRIMARY KEY ("redemptionCodeId", "groupName"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_73aa9a28b3436e8072d20c390a" ON "redemption_code_groups_group" ("redemptionCodeId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1e8020b70ae56fd67a68fa7ccc" ON "redemption_code_groups_group" ("groupName") `,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "redemption_code_permissions_permission" ADD CONSTRAINT "FK_bd154e39992640cd88f2cf875eb" FOREIGN KEY ("redemptionCodeId") REFERENCES "redemption_code"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "redemption_code_permissions_permission" ADD CONSTRAINT "FK_0c18f467e7118a23f9609acf42a" FOREIGN KEY ("permissionName") REFERENCES "permission"("name") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "redemption_code_groups_group" ADD CONSTRAINT "FK_73aa9a28b3436e8072d20c390a2" FOREIGN KEY ("redemptionCodeId") REFERENCES "redemption_code"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "redemption_code_groups_group" ADD CONSTRAINT "FK_1e8020b70ae56fd67a68fa7cccf" FOREIGN KEY ("groupName") REFERENCES "group"("name") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "redemption_code_groups_group" DROP CONSTRAINT "FK_1e8020b70ae56fd67a68fa7cccf"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "redemption_code_groups_group" DROP CONSTRAINT "FK_73aa9a28b3436e8072d20c390a2"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "redemption_code_permissions_permission" DROP CONSTRAINT "FK_0c18f467e7118a23f9609acf42a"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "redemption_code_permissions_permission" DROP CONSTRAINT "FK_bd154e39992640cd88f2cf875eb"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_1e8020b70ae56fd67a68fa7ccc"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_73aa9a28b3436e8072d20c390a"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "redemption_code_groups_group"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_0c18f467e7118a23f9609acf42"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_bd154e39992640cd88f2cf875e"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "redemption_code_permissions_permission"`,
      undefined
    );
  }
}
