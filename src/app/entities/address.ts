import { Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";


@Entity("address")


export class Address extends AbstractEntity{
    @PrimaryGeneratedColumn("increment")
    public addressId : string;

    @Column({nullable : false})
    public placeName : string;

    @Column({nullable : false})
    public city : string;

    @Column({nullable : false})
    public district : string;

    @Column({nullable : false})
    public state : string;

    @Column({nullable : false})
    public pincode : string;

    @Column({nullable : false})
    public mobileNumber : string;

    @Column({nullable : false})
    public emailId : string;
}