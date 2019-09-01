import { MigrationInterface, QueryRunner } from "typeorm";

import { SEMESTERLY_MEMBERSHIP, YEARLY_MEMBERSHIP } from "../lib/products";

const DEFAULT_SUB = "google-oauth2|115625753701019295484";

/**
 * Adds the initial superadmin user "acm@mst.edu" and the initial
 * products "ACM Semester Membership" and "ACM Yearly Membership".
 */
export class initialData1567049233839 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const queryBuilder = await queryRunner.manager.createQueryBuilder();
    await queryBuilder
      .insert()
      .into("user")
      .values([
        {
          sub: DEFAULT_SUB,
          firstName: "MST",
          lastName: "ACM",
          email: "acm@mst.edu",
          emailVerified: true,
          isSuperAdmin: true
        }
      ])
      .execute();

    await queryBuilder
      .insert()
      .into("product")
      .values([
        {
          tag: SEMESTERLY_MEMBERSHIP.tag,
          displayName: "ACM Semesterly Membership",
          description:
            "ACM Membership purchase for a single semester (6 months).",
          price: 11
        }
      ])
      .execute();
    await queryBuilder
      .insert()
      .into("product")
      .values([
        {
          tag: YEARLY_MEMBERSHIP.tag,
          displayName: "ACM Yearly Membership",
          description: "ACM Membership purchase for a single year (12 months).",
          price: 20
        }
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const queryBuilder = await queryRunner.manager.createQueryBuilder();

    await queryBuilder
      .delete()
      .from("user")
      .where("sub = :sub", { sub: DEFAULT_SUB })
      .execute();

    await queryBuilder
      .delete()
      .from("product")
      .where("tag = :tag", { tag: SEMESTERLY_MEMBERSHIP.tag })
      .execute();

    await queryBuilder
      .delete()
      .from("product")
      .where("tag = :tag", { tag: YEARLY_MEMBERSHIP.tag })
      .execute();
  }
}
