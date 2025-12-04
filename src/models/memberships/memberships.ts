import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Bills } from "../bills/bills";
import { Usermemberships } from "../usermemberships/usermemberships";

@Entity({name:"memberships", schema:"public"})
export class Memberships {

    @PrimaryGeneratedColumn({type:"integer", name:"id_membership"})
    public idMembership: number;

    @Column({type:"varchar", name:"name_membership"})
    public nameMembership: string;

    @Column({type:"integer", name:"price_membership"})
    public priceMembership: number;

    /**Foranea con bills */
    @OneToMany(() => Bills, (objBill:Bills) => objBill.id_member_bill, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE"
    }) 
        public id_memberBill?: Bills[];

    /**foranea userMembership */
    @ManyToOne(() =>Usermemberships, (objUm:Usermemberships)=> objUm.idMemShip)
    public userMemberships?: Usermemberships;

    /**constructor */
    constructor(id:number, name:string, price:number){
        this.idMembership=id;
        this.nameMembership=name;
        this.priceMembership=price
    }


}
