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

@Entity({ name: 'bills', schema: 'public' })
export class Bills {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_bill' })
  public idBill: number;

  /**columna fecha de creación */
  @Column({ type: 'date', name: 'issue_date_bill' })
  public issueDateBill: Date;

  @Column({ type: 'numeric', name: 'total_amount_bill' })
  public totalAmountBill: number;

  @Column({ type: 'text', name: 'description' })
  public description: String;

  /**foranea de membresia */
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

  /**foranea con users */
  @ManyToOne(() => Users, (objUser: Users) => objUser.idUser, {
    nullable: false,
  })
  @JoinColumn({ name: 'idUser', referencedColumnName: 'idUser' })
  public id_user_bill!: Users;

  /**foranea con products */
  @ManyToMany(() => Products, (objProduct: Products) => objProduct.idProduct, {
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
