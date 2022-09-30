import { MigrationInterface, QueryRunner } from "typeorm";

export class ShirtMembership1586508104823 implements MigrationInterface {
  name = "ShirtMembership1586508104823";

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "shirtReceived" boolean NOT NULL DEFAULT false`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "shirtReceived"`,
      undefined
    );
  }
}
