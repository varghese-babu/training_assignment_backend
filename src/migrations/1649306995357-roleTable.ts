import {MigrationInterface, QueryRunner} from "typeorm";

export class roleTable1649306995357 implements MigrationInterface {
    name = 'roleTable1649306995357'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "roles" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "role_id" SERIAL NOT NULL, "role_name" character varying NOT NULL, CONSTRAINT "PK_09f4c8130b54f35925588a37b6a" PRIMARY KEY ("role_id"))`);
        await queryRunner.query(`CREATE TABLE "new_table" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "is_active" boolean NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_729b6fb6aeb7253bb3d57f89f05" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "new_table"`);
        await queryRunner.query(`DROP TABLE "roles"`);
    }

}
