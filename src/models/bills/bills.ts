import {
  Column,
  Double,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Users } from '../users/users';
import { Memberships } from '../memberships/memberships';
import { Products } from '../products/products';
import { BillDetails } from '../billDetails/billdetails';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity({ name: 'bills', schema: 'public' })
export class Bills {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_bill' })
  public idBill: number;

  /**columna fecha de creación */
  @ApiProperty({
    description: 'Fecha de creación de la factura',
    example: '2026-10-03',
  })
  @Column({ type: 'date', name: 'issue_date_bill' })
  public issueDateBill: Date;

  @ApiProperty({ description: 'Valor total de la factura', example: 450000.0 })
  @Column({ type: 'numeric', name: 'total_amount_bill' })
  public totalAmountBill: number;

  @ApiProperty({
    description: 'Descripción de la compra',
    example: 'Productos + mensualidad',
  })
  @Column({ type: 'text', name: 'description' })
  public description: String;

  /**foranea de membresia */
  @ApiProperty({ description: 'ID del tipo de membresía', example: 1 })
  @ManyToOne(
    () => Memberships,
    (objMembe: Memberships) => objMembe.idMembership,
    {
      nullable: true,
    },
  )
  @JoinColumn({
    name: 'ididMembershipMember',
    referencedColumnName: 'idMembership',
  })
  public id_member_bill?: Memberships;
  
  /**Foranea con usuarios */
  @ApiProperty({ type: () => Users, description: 'ID del usuario', example: 1 })
  @ManyToOne(() => Users, (objUser: Users) => objUser.idUser, {
    nullable: false,
  })
  @JoinColumn({ name: 'idUser', referencedColumnName: 'idUser' })
  public id_user_bill!: Users;

  /**foranea con products */
  @ApiProperty({ description: 'ID del producto', example: 2 })
  @OneToMany(() => Products, (objProduct: Products) => objProduct.idProduct, {
    nullable: false,
  })
  @JoinColumn({ name: 'idProduct', referencedColumnName: 'idProduct' })
  public idProduct?: Products;

  /**foranea billsdetails */
  @OneToOne(() => BillDetails, (detail) => detail.bill)
  details?: BillDetails[];

  /**Constructor */
  constructor(id: number, issueDate: Date, total: number, description: String) {
    this.idBill = id;
    this.issueDateBill = issueDate;
    this.totalAmountBill = total;
    this.description = description;
  }
}
