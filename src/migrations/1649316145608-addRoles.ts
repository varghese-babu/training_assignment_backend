import {MigrationInterface, QueryRunner} from "typeorm";

export class addRoles1649316145608 implements MigrationInterface {
    name = 'addRoles1649316145608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "role" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role"`);
    }

}
