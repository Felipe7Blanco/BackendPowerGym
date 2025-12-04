import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Bills } from "../bills/bills";
import { Products } from "../products/products";
import { Memberships } from "../memberships/memberships";

// bill_details.ts
@Entity({name:"bill_details", schema:"public"})
export class BillDetails {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Bills, bill => bill.details)
    @JoinColumn({ name: "bill_id" })
    public bill!: Bills;

    @ManyToOne(() => Products, { nullable: true })
    @JoinColumn({ name: "product_id" })
    public product?: Products;

    @ManyToOne(() => Memberships, { nullable: true })
    @JoinColumn({ name: "membership_id" })
    public membership?: Memberships;

    @Column({ type: "integer" , name:"quantity"})
    quantity: number;

    @Column({ type: "numeric", name :"unitPrice",precision: 10, scale: 2 })
    unitPrice: number;

    @Column({ type: "text" , name:"description"})
    description: string;

    constructor(id:number, quantity:number, unitPrice: number, description: string){
        this.id=id;
        this.quantity =quantity;
        this.description = description;
        this.unitPrice=unitPrice;
    }
}