import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity("new_table")
export class projects{
    @PrimaryGeneratedColumn('uuid')
    public id: string;
    @Column({ nullable: false})
    public name: string;
    @Column()
    public isActive: boolean;
    @Column()
    public description: string;
}