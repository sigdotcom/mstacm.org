import { MigrationInterface, QueryRunner } from "typeorm";

import { SEMESTERLY_MEMBERSHIP, YEARLY_MEMBERSHIP } from "../lib/products";

const DEFAULT_SUB = "google-oauth2|115625753701019295484";

/**
 * Adds the initial superadmin user "acm@mst.edu" and the initial
 * products "ACM Semester Membership" and "ACM Yearly Membership".
 */
export class initialData1567049233839 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `INSERT INTO "user" ("sub", "firstName", "lastName", "email", "emailVerified", "isSuperAdmin")
                   VALUES ('${DEFAULT_SUB}', 'MST', 'ACM', 'acm@mst.edu', true, true)`
    );

    await queryRunner.query(
      `INSERT INTO "product" ("tag", "displayName", "description", "price")
                      VALUES ('${SEMESTERLY_MEMBERSHIP.tag}', 'ACM Semesterly Membership', 'ACM Membership purchase for a single semester (6 months).', 11),
                             ('${YEARLY_MEMBERSHIP.tag}', 'ACM Yearly Membership', 'ACM Membership purchase for a single year (12 months).', 20)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DELETE FROM "user" where sub='${DEFAULT_SUB}'`);
    await queryRunner.query(
      `DELETE FROM "product" where tag='${SEMESTERLY_MEMBERSHIP.tag}'`
    );
    await queryRunner.query(
      `DELETE FROM "product" where tag='${YEARLY_MEMBERSHIP.tag}'`
    );
  }
}
