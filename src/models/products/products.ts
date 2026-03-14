import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bills } from '../bills/bills';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
@Entity({ name: 'products', schema: 'public' })
export class Products {
  //id
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_product' })
  public idProduct: number;

  //nombre
  @ApiProperty({ description: 'Nombre del producto', example: 'Creatina' })
  @Column({
    type: 'varchar',
    name: 'name_product',
    length: 250,
    nullable: false,
  })
  public nameProduct: string;

  @ApiProperty({ description: 'Descripción del producto', example: 'Monohidratada, 100 servicios' })
  //descripción
  @Column({ type: 'text', name: 'description_product', nullable: false })
  public descriptionProduct: string;

  //precio
  @ApiProperty({ description: 'Precio del producto', example: 120000.0 })
  @Column({ type: 'numeric', name: 'price_product', nullable: false })
  public priceProduct: number;

  //estado (disponible o agotado)
  @ApiProperty({ description: 'Disponibilidad del producto', example: 1 })
  @Column({ type: 'integer', name: 'status_product', nullable: false })
  public statusProduct: number;

  @ManyToOne(() => Bills, (objBill: Bills) => objBill.idProduct)
  public idbill?: Bills;

  constructor(
    id: number,
    name: string,
    description: string,
    price: number,
    status: number,
  ) {
    this.idProduct = id;
    this.nameProduct = name;
    this.descriptionProduct = description;
    this.priceProduct = price;
    this.statusProduct = status;
  }
}
