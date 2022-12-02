import { MigrationInterface, QueryRunner } from "typeorm";

export class dynamicEvents1568916003044 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "sig" DROP CONSTRAINT "FK_98c8b1b463e86659d4e4638337d"`
    );
    await queryRunner.query(`ALTER TABLE "sig" DROP COLUMN "hostedEventsId"`);
    await queryRunner.query(
      `ALTER TABLE "event" ADD "hostSigName" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "event" ADD CONSTRAINT "FK_c7d757a11c78a205b78944150b0" FOREIGN KEY ("hostSigName") REFERENCES "sig"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );

    // Change eventTitle to be a not nullable variable length.
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "eventTitle" TYPE character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "eventTitle" SET NOT NULL`
    );

    // Change description to be a not nullable variable length.
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "description" TYPE character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "description" SET NOT NULL`
    );

    // Change location to be a not nullable variable length.
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "location" TYPE character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "location" SET NOT NULL`
    );

    // Change presenter to be a not nullable variable length.
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "presenter" TYPE character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "presenter" SET NOT NULL`
    );

    // Change flierLink to be variable length.
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "flierLink" TYPE character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "flierLink" DROP NOT NULL`
    );

    // Change eventLink to be variable length.
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "eventLink" TYPE character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "eventLink" DROP NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "event" DROP CONSTRAINT "FK_c7d757a11c78a205b78944150b0"`
    );

    // Change eventLink to be maximum of 100 characters.
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "eventLink" TYPE character varying(100)`
    );
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "eventLink" DROP NOT NULL`
    );

    // Change flierLink to be maximum of 100 characters.
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "flierLink" TYPE character varying(100)`
    );
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "flierLink" DROP NOT NULL`
    );

    // Change location to be maximum of 100 characters and not nullable.
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "location" TYPE character varying(100)`
    );
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "location" SET NOT NULL`
    );

    // Change presenter to be maximum of 100 characters and not nullable.
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "presenter" TYPE character varying(100)`
    );
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "presenter" SET NOT NULL`
    );

    // Change location to be maximum of 300 characters and not nullable.
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "description" TYPE character varying(300)`
    );
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "description" SET NOT NULL`
    );

    // Change presenter to be maximum of 300 characters and not nullable.
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "description" TYPE character varying(300)`
    );
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "description" SET NOT NULL`
    );

    // Change eventTitle to be maximum of 100 characters and not nullable.
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "eventTitle" TYPE character varying(100)`
    );
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "eventTitle" SET NOT NULL`
    );

    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "hostSigName"`);
    await queryRunner.query(`ALTER TABLE "sig" ADD "hostedEventsId" integer`);
    await queryRunner.query(
      `ALTER TABLE "sig" ADD CONSTRAINT "FK_98c8b1b463e86659d4e4638337d" FOREIGN KEY ("hostedEventsId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
