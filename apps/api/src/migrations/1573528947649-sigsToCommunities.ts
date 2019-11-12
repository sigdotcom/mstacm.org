import { MigrationInterface, QueryRunner } from "typeorm";

export class sigsToCommunities1573528947649 implements MigrationInterface {
  name = "sigsToCommunities1573528947649";

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "event" DROP CONSTRAINT "FK_c7d757a11c78a205b78944150b0"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "event" RENAME COLUMN "hostSigName" TO "hostCommunityName"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "community" ("name" character varying NOT NULL, "dateFounded" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying NOT NULL, CONSTRAINT "PK_696fdadbf0a710efbbf9d98ad9f" PRIMARY KEY ("name"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "user_communities_community" ("userId" uuid NOT NULL, "communityName" character varying NOT NULL, CONSTRAINT "PK_20434e27da8938ab2307e57efdc" PRIMARY KEY ("userId", "communityName"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b4e18e70486964dce0b5df55eb" ON "user_communities_community" ("userId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d6c1a669da19f49aa7828ac828" ON "user_communities_community" ("communityName") `,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "event" ADD CONSTRAINT "FK_e2db089a7f2560f10130c430c89" FOREIGN KEY ("hostCommunityName") REFERENCES "community"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "user_communities_community" ADD CONSTRAINT "FK_b4e18e70486964dce0b5df55eb5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "user_communities_community" ADD CONSTRAINT "FK_d6c1a669da19f49aa7828ac8288" FOREIGN KEY ("communityName") REFERENCES "community"("name") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "user_communities_community" DROP CONSTRAINT "FK_d6c1a669da19f49aa7828ac8288"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "user_communities_community" DROP CONSTRAINT "FK_b4e18e70486964dce0b5df55eb5"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "event" DROP CONSTRAINT "FK_e2db089a7f2560f10130c430c89"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_d6c1a669da19f49aa7828ac828"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_b4e18e70486964dce0b5df55eb"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "user_communities_community"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "community"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "event" RENAME COLUMN "hostCommunityName" TO "hostSigName"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "event" ADD CONSTRAINT "FK_c7d757a11c78a205b78944150b0" FOREIGN KEY ("hostSigName") REFERENCES "sig"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
  }
}
