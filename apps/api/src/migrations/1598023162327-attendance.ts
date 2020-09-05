import {MigrationInterface, QueryRunner} from "typeorm";

export class attendance1598023162327 implements MigrationInterface {
    name = 'attendance1598023162327'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user_events_attended_event" ("userId" uuid NOT NULL, "eventId" integer NOT NULL, CONSTRAINT "PK_873fc1919ee78d1124994669970" PRIMARY KEY ("userId", "eventId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_6235e494340965ef653fd95d9e" ON "user_events_attended_event" ("userId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_be8b6a5c1e6d9b21d3e57e2f9b" ON "user_events_attended_event" ("eventId") `, undefined);
        await queryRunner.query(`ALTER TABLE "event" ADD "urlKey" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "user_events_attended_event" ADD CONSTRAINT "FK_6235e494340965ef653fd95d9ec" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_events_attended_event" ADD CONSTRAINT "FK_be8b6a5c1e6d9b21d3e57e2f9be" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_events_attended_event" DROP CONSTRAINT "FK_be8b6a5c1e6d9b21d3e57e2f9be"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_events_attended_event" DROP CONSTRAINT "FK_6235e494340965ef653fd95d9ec"`, undefined);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "urlKey"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_be8b6a5c1e6d9b21d3e57e2f9b"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_6235e494340965ef653fd95d9e"`, undefined);
        await queryRunner.query(`DROP TABLE "user_events_attended_event"`, undefined);
    }

}
