import { Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";


@Entity("roles")


export class EmployeeRoles extends AbstractEntity{
    @PrimaryGeneratedColumn("increment")
    public roleId : string;

    @Column({nullable : false})
    public roleName : string;
}