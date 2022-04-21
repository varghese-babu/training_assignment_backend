import {MigrationInterface, QueryRunner} from "typeorm";

export class addAddress1649325934076 implements MigrationInterface {
    name = 'addAddress1649325934076'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "address_id" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "address_address_id" integer`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_6b8e7c75fe60bcf09f309687ba5" UNIQUE ("address_address_id")`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_6b8e7c75fe60bcf09f309687ba5" FOREIGN KEY ("address_address_id") REFERENCES "address"("address_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_6b8e7c75fe60bcf09f309687ba5"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_6b8e7c75fe60bcf09f309687ba5"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "address_address_id"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "address_id"`);
    }

}
