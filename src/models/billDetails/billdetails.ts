import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Bills } from "../bills/bills";
import { Products } from "../products/products";
import { Memberships } from "../memberships/memberships";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// bill_details.ts
@Entity({name:"bill_details", schema:"public"})
export class BillDetails {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ type: ()=> Bills, description: 'ID de la factura', example: 1 })
    @OneToOne(() => Bills, bill => bill.details)
    @JoinColumn({ name: "bill_id" })
    public bill!: Bills;

    @ApiProperty({ type: ()=> Products,description: 'ID del producto', example: 2 })
    @ManyToOne(() => Products, { nullable: true })
    @JoinColumn({ name: "product_id" })
    public product?: Products;

    @ApiProperty({ type: ()=> Memberships,description: 'ID de la membresía', example: 1 })
    @ManyToOne(() => Memberships, { nullable: true })
    @JoinColumn({ name: "membership_id" })
    public membership?: Memberships;

    @ApiProperty({ description: 'Cantidad del producto', example: 1 })
    @Column({ type: "integer" , name:"quantity"})
    quantity: number;

    @ApiProperty({ description: 'Precio Unitario', example: 50000.0 })
    @Column({ type: "numeric", name :"unitPrice",precision: 10, scale: 2 })
    unitPrice: number;

    @ApiProperty({ description: 'Descripción de la compra', example: 'Excelente servicio' })
    @Column({ type: "text" , name:"description"})
    description: string;

    constructor(id:number, quantity:number, unitPrice: number, description: string){
        this.id=id;
        this.quantity =quantity;
        this.description = description;
        this.unitPrice=unitPrice;
    }
}