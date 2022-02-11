import { MigrationInterface, QueryRunner } from "typeorm";

export class redemptionCode1569092824789 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "redemption_code" ("id" character varying NOT NULL, "dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "redeemed" boolean NOT NULL DEFAULT false, "expirationDate" TIMESTAMP NOT NULL, "transactionId" uuid, CONSTRAINT "REL_55ec006e7f426d7cc5d27b7ac7" UNIQUE ("transactionId"), CONSTRAINT "PK_443cfed664376c917994098fc06" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TYPE "transaction_paymenttype_enum" AS ENUM('stripe', 'redemption-code')`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD "paymentType" "transaction_paymenttype_enum" NOT NULL DEFAULT 'stripe'`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "price" TYPE numeric`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ALTER COLUMN "intent" DROP NOT NULL`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "redemption_code" ADD CONSTRAINT "FK_55ec006e7f426d7cc5d27b7ac7d" FOREIGN KEY ("transactionId") REFERENCES "transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "redemption_code" DROP CONSTRAINT "FK_55ec006e7f426d7cc5d27b7ac7d"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ALTER COLUMN "intent" SET NOT NULL`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "price" TYPE numeric`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP COLUMN "paymentType"`,
      undefined
    );
    await queryRunner.query(
      `DROP TYPE "transaction_paymenttype_enum"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "redemption_code"`, undefined);
  }
}
