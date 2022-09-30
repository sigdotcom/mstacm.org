import { MigrationInterface, QueryRunner } from "typeorm";

export class userProfileAnnotations1569115215091 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "profilePictureUrl" character varying NOT NULL DEFAULT 'https://www.gravatar.com/avatar/?d=identicon&s=140'`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "graduationDate" TIMESTAMP`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "graduationDate"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "profilePictureUrl"`,
      undefined
    );
  }
}
