import {MigrationInterface, QueryRunner} from "typeorm";

export class initialSchema1567025214043 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "sig" ("name" character varying NOT NULL, "dateFounded" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying NOT NULL, "hostedEventsId" integer, CONSTRAINT "PK_aa2c70e7d89845055f7a62c2e45" PRIMARY KEY ("name"))`);
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "dateHosted" TIMESTAMP NOT NULL, "dateExpire" TIMESTAMP NOT NULL, "eventTitle" character varying(100) NOT NULL, "description" character varying(300) NOT NULL, "location" character varying(100) NOT NULL, "flierLink" character varying(100), "eventLink" character varying(100), "creatorId" uuid NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permission" ("name" character varying NOT NULL, CONSTRAINT "PK_240853a0c3353c25fb12434ad33" PRIMARY KEY ("name"))`);
        await queryRunner.query(`CREATE TABLE "group" ("name" character varying NOT NULL, "usersId" uuid, CONSTRAINT "PK_8a45300fd825918f3b40195fbdc" PRIMARY KEY ("name"))`);
        await queryRunner.query(`CREATE TABLE "resume" ("id" character varying NOT NULL, "url" character varying NOT NULL, "added" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7ff05ea7599e13fac01ac812e48" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_7ff05ea7599e13fac01ac812e4" ON "resume" ("id") `);
        await queryRunner.query(`CREATE TABLE "product_category" ("name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_96152d453aaea425b5afde3ae9f" PRIMARY KEY ("name"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "price" numeric NOT NULL DEFAULT 0, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "purchase" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "productId" uuid, "transactionId" uuid, CONSTRAINT "PK_86cc2ebeb9e17fc9c0774b05f69" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "transaction_status_enum" AS ENUM('started', 'success', 'error')`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "intent" character varying NOT NULL, "charged" integer, "status" "transaction_status_enum" NOT NULL DEFAULT 'started', "userId" uuid, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "googleSub" character varying NOT NULL, "firstName" character varying(50) NOT NULL, "lastName" character varying(50) NOT NULL, "email" character varying NOT NULL, "isSuperAdmin" boolean NOT NULL DEFAULT false, "dateJoined" TIMESTAMP NOT NULL DEFAULT now(), "membershipExpiration" TIMESTAMP, "isActive" boolean NOT NULL DEFAULT true, "resumeId" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_00490995bdb8773265c96cd341" UNIQUE ("resumeId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_1132e9fb7a2bb725a1fed6996c" ON "user" ("googleSub") `);
        await queryRunner.query(`CREATE TABLE "application" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "token" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, CONSTRAINT "PK_569e0c3e863ebdf5f2408ee1670" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group_permissions_permission" ("groupName" character varying NOT NULL, "permissionName" character varying NOT NULL, CONSTRAINT "PK_8da3d250729bccea1d62cfd3c1d" PRIMARY KEY ("groupName", "permissionName"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d904f303ff88fe58e4346cb246" ON "group_permissions_permission" ("groupName") `);
        await queryRunner.query(`CREATE INDEX "IDX_d70737d5e039fa1bface88fcbf" ON "group_permissions_permission" ("permissionName") `);
        await queryRunner.query(`CREATE TABLE "product_categories_product_category" ("productId" uuid NOT NULL, "productCategoryName" character varying NOT NULL, CONSTRAINT "PK_fb7a19b95f6ee8bfe08a5e6ccc8" PRIMARY KEY ("productId", "productCategoryName"))`);
        await queryRunner.query(`CREATE INDEX "IDX_37c2bc279249bec81521f8fe89" ON "product_categories_product_category" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_95f510d61f2c2b8b08437f063b" ON "product_categories_product_category" ("productCategoryName") `);
        await queryRunner.query(`CREATE TABLE "user_permissions_permission" ("userId" uuid NOT NULL, "permissionName" character varying NOT NULL, CONSTRAINT "PK_e97fb2d1a7dad03bb1ff3c68489" PRIMARY KEY ("userId", "permissionName"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5b72d197d92b8bafbe7906782e" ON "user_permissions_permission" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7691aabb0be21b97826f754a31" ON "user_permissions_permission" ("permissionName") `);
        await queryRunner.query(`CREATE TABLE "user_sigs_sig" ("userId" uuid NOT NULL, "sigName" character varying NOT NULL, CONSTRAINT "PK_09da20e844b764fc53192fd09db" PRIMARY KEY ("userId", "sigName"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d645b3ff99074ff532cde00bf3" ON "user_sigs_sig" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e0f6eba4f32371906a63f3b9d0" ON "user_sigs_sig" ("sigName") `);
        await queryRunner.query(`ALTER TABLE "sig" ADD CONSTRAINT "FK_98c8b1b463e86659d4e4638337d" FOREIGN KEY ("hostedEventsId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_7a773352fcf1271324f2e5a3e41" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group" ADD CONSTRAINT "FK_adb912e10c347c8a1c9658dc4c4" FOREIGN KEY ("usersId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD CONSTRAINT "FK_9af3a556aa0f166dd771a1e6c46" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD CONSTRAINT "FK_d65d5869ba2fc57ed3ba1730def" FOREIGN KEY ("transactionId") REFERENCES "transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_605baeb040ff0fae995404cea37" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_00490995bdb8773265c96cd3413" FOREIGN KEY ("resumeId") REFERENCES "resume"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application" ADD CONSTRAINT "FK_b4ae3fea4a24b4be1a86dacf8a2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_permissions_permission" ADD CONSTRAINT "FK_d904f303ff88fe58e4346cb2463" FOREIGN KEY ("groupName") REFERENCES "group"("name") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_permissions_permission" ADD CONSTRAINT "FK_d70737d5e039fa1bface88fcbf2" FOREIGN KEY ("permissionName") REFERENCES "permission"("name") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_categories_product_category" ADD CONSTRAINT "FK_37c2bc279249bec81521f8fe89b" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_categories_product_category" ADD CONSTRAINT "FK_95f510d61f2c2b8b08437f063b9" FOREIGN KEY ("productCategoryName") REFERENCES "product_category"("name") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_permissions_permission" ADD CONSTRAINT "FK_5b72d197d92b8bafbe7906782ec" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_permissions_permission" ADD CONSTRAINT "FK_7691aabb0be21b97826f754a312" FOREIGN KEY ("permissionName") REFERENCES "permission"("name") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_sigs_sig" ADD CONSTRAINT "FK_d645b3ff99074ff532cde00bf36" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_sigs_sig" ADD CONSTRAINT "FK_e0f6eba4f32371906a63f3b9d01" FOREIGN KEY ("sigName") REFERENCES "sig"("name") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE TABLE "query-result-cache" ("id" SERIAL NOT NULL, "identifier" character varying, "time" bigint NOT NULL, "duration" integer NOT NULL, "query" text NOT NULL, "result" text NOT NULL, CONSTRAINT "PK_6a98f758d8bfd010e7e10ffd3d3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "query-result-cache"`);
        await queryRunner.query(`ALTER TABLE "user_sigs_sig" DROP CONSTRAINT "FK_e0f6eba4f32371906a63f3b9d01"`);
        await queryRunner.query(`ALTER TABLE "user_sigs_sig" DROP CONSTRAINT "FK_d645b3ff99074ff532cde00bf36"`);
        await queryRunner.query(`ALTER TABLE "user_permissions_permission" DROP CONSTRAINT "FK_7691aabb0be21b97826f754a312"`);
        await queryRunner.query(`ALTER TABLE "user_permissions_permission" DROP CONSTRAINT "FK_5b72d197d92b8bafbe7906782ec"`);
        await queryRunner.query(`ALTER TABLE "product_categories_product_category" DROP CONSTRAINT "FK_95f510d61f2c2b8b08437f063b9"`);
        await queryRunner.query(`ALTER TABLE "product_categories_product_category" DROP CONSTRAINT "FK_37c2bc279249bec81521f8fe89b"`);
        await queryRunner.query(`ALTER TABLE "group_permissions_permission" DROP CONSTRAINT "FK_d70737d5e039fa1bface88fcbf2"`);
        await queryRunner.query(`ALTER TABLE "group_permissions_permission" DROP CONSTRAINT "FK_d904f303ff88fe58e4346cb2463"`);
        await queryRunner.query(`ALTER TABLE "application" DROP CONSTRAINT "FK_b4ae3fea4a24b4be1a86dacf8a2"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_00490995bdb8773265c96cd3413"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_605baeb040ff0fae995404cea37"`);
        await queryRunner.query(`ALTER TABLE "purchase" DROP CONSTRAINT "FK_d65d5869ba2fc57ed3ba1730def"`);
        await queryRunner.query(`ALTER TABLE "purchase" DROP CONSTRAINT "FK_9af3a556aa0f166dd771a1e6c46"`);
        await queryRunner.query(`ALTER TABLE "group" DROP CONSTRAINT "FK_adb912e10c347c8a1c9658dc4c4"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_7a773352fcf1271324f2e5a3e41"`);
        await queryRunner.query(`ALTER TABLE "sig" DROP CONSTRAINT "FK_98c8b1b463e86659d4e4638337d"`);
        await queryRunner.query(`DROP INDEX "IDX_e0f6eba4f32371906a63f3b9d0"`);
        await queryRunner.query(`DROP INDEX "IDX_d645b3ff99074ff532cde00bf3"`);
        await queryRunner.query(`DROP TABLE "user_sigs_sig"`);
        await queryRunner.query(`DROP INDEX "IDX_7691aabb0be21b97826f754a31"`);
        await queryRunner.query(`DROP INDEX "IDX_5b72d197d92b8bafbe7906782e"`);
        await queryRunner.query(`DROP TABLE "user_permissions_permission"`);
        await queryRunner.query(`DROP INDEX "IDX_95f510d61f2c2b8b08437f063b"`);
        await queryRunner.query(`DROP INDEX "IDX_37c2bc279249bec81521f8fe89"`);
        await queryRunner.query(`DROP TABLE "product_categories_product_category"`);
        await queryRunner.query(`DROP INDEX "IDX_d70737d5e039fa1bface88fcbf"`);
        await queryRunner.query(`DROP INDEX "IDX_d904f303ff88fe58e4346cb246"`);
        await queryRunner.query(`DROP TABLE "group_permissions_permission"`);
        await queryRunner.query(`DROP TABLE "application"`);
        await queryRunner.query(`DROP INDEX "IDX_1132e9fb7a2bb725a1fed6996c"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TYPE "transaction_status_enum"`);
        await queryRunner.query(`DROP TABLE "purchase"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "product_category"`);
        await queryRunner.query(`DROP INDEX "IDX_7ff05ea7599e13fac01ac812e4"`);
        await queryRunner.query(`DROP TABLE "resume"`);
        await queryRunner.query(`DROP TABLE "group"`);
        await queryRunner.query(`DROP TABLE "permission"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "sig"`);
    }

}
