import { MigrationInterface, QueryRunner } from "typeorm";

import { SEMESTERLY_MEMBERSHIP, YEARLY_MEMBERSHIP } from "../lib/products";

export class statementDescriptor1568237426157 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "product" ADD "statementDescriptor" character varying(17)`
    );
    await queryRunner.query(
      `UPDATE "product" SET "statementDescriptor"='MEMBERSHIP' WHERE tag='${YEARLY_MEMBERSHIP.tag}'`
    );
    await queryRunner.query(
      `UPDATE "product" SET "statementDescriptor"='MEMBERSHIP' WHERE tag='${SEMESTERLY_MEMBERSHIP.tag}'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "statementDescriptor"`
    );
  }
}
