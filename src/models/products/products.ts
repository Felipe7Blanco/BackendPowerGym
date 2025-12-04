import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Bills } from "../bills/bills";

@Entity({name:"products", schema: "public"})
export class Products {
    //id
    @PrimaryGeneratedColumn({type:"integer", name: "id_product" })
    public idProduct: number;

    //nombre
    @Column({type: "varchar", name: "name_product", length: 250, nullable: false})
    public nameProduct: string;
    //descripción
    @Column({type: "text", name: "description_product", nullable: false})
    public descriptionProduct: string;
    //precio
    @Column({type: "numeric", name: "price_product", nullable: false})
    public priceProduct: number;
    
    //estado (disponible o agotado)
    @Column({type: "integer", name: "status_product",  nullable: false})
    public statusProduct: number;

    @ManyToMany(() => Bills, (objBill:Bills) =>objBill.idProduct)
    public idbill?:Bills;

    constructor(id: number, name: string, description: string, price: number,  status: number){
        this.idProduct = id;
        this.nameProduct = name;
        this.descriptionProduct = description;
        this.priceProduct = price;
        this.statusProduct = status;
    }


}
