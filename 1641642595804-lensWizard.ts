import {MigrationInterface, QueryRunner, getRepository} from "typeorm";

const lensWizardSeed = [
    {id: 1, name: "wizard1"}
]



export class lensWizard1641642595804 implements MigrationInterface {


    public async up(queryRunner: QueryRunner): Promise<void> {
       const result = await getRepository('lensWizard').save(lensWizardSeed);
        console.warn(result);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
