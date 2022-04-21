import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedRoles1649325211889 implements MigrationInterface {
    name = 'AddedRoles1649325211889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "address_id" SERIAL NOT NULL, "place_name" character varying NOT NULL, "city" character varying NOT NULL, "district" character varying NOT NULL, "state" character varying NOT NULL, "pincode" character varying NOT NULL, "mobile_number" character varying NOT NULL, "email_id" character varying NOT NULL, CONSTRAINT "PK_db4aae0a059fd4ef7709cb802b0" PRIMARY KEY ("address_id"))`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "role_id" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "role_role_id" integer`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_1c3ddc0762fa1a7665d0183c430" UNIQUE ("role_role_id")`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_1c3ddc0762fa1a7665d0183c430" FOREIGN KEY ("role_role_id") REFERENCES "roles"("role_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_1c3ddc0762fa1a7665d0183c430"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_1c3ddc0762fa1a7665d0183c430"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role_role_id"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role_id"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "role" character varying`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
