import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Roles } from '../roles/roles';
import { acces } from '../acces/acces';
import { Bills } from '../bills/bills';
import { MedicalRecords } from '../medical-records/medical-records';
import { Usermemberships } from '../usermemberships/usermemberships';

//decorador para exportar la clase
//como tabla a la bd
@Entity({ name: 'users', schema: 'public' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_user' })
  public idUser: number;

  @Column({ type: 'varchar', name: 'name_user', length: 250, nullable: false })
  public nameUser: string;

  @Column({
    type: 'varchar',
    name: 'last_name_user',
    length: 250,
    nullable: false,
  })
  public lastnameUser: string;

  @Column({
    type: 'varchar',
    name: 'identification_user',
    length: 10,
    nullable: false,
  })
  public identificationUser: string;

  @Column({ type: 'varchar', name: 'phone_user', length: 10, nullable: false })
  public phoneUser: string;

  @Column({ type: 'date', name: 'date_user', nullable: false })
  public dateUser: Date;

  @Column({ type: 'varchar', name: 'eps_user', length: 250, nullable: false })
  public epsUser: string;

  @Column({ type: 'varchar', name: 'medical_history_user', nullable: true })
  public medicalHistoryUser: string;

  //columna/atributo para el soft delete y no perder el registro
  @Column({ type: 'integer', name: 'status_user', nullable: false })
  public statusUser: number;

  @Column({ type: 'integer', name: 'gender_user', nullable: false })
  public genderUser: number;

  //foranea con rol
  @ManyToOne(() => Roles, (objRole: Roles) => objRole.User, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'id_rol_user', referencedColumnName: 'idRol' })
  public idRolUser?: Roles[];

  //bills foranea con facturas
  @OneToMany(() => Bills, (objBill: Bills) => objBill.id_user_bill, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  public idUserBill?: Bills[];

  //medicalrecords
  @OneToOne(
    () => MedicalRecords,
    (objMedical: MedicalRecords) => objMedical.idUserM,
  )
  public id_medicalRecord?: MedicalRecords[];

  @OneToMany(() => acces, (objAcces: acces) => objAcces.passwordAccess, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  public access?: acces[];

  /**foranea con usermemberships */
  @OneToMany(
    () => Usermemberships,
    (objUserMem: Usermemberships) => objUserMem.idUserM,
  )
  public usermembers?: Usermemberships[];

  s;

  //contructor
  constructor(
    id: number,
    name: string,
    lastname: string,
    identification: string,
    phone: string,
    date: Date,
    eps: string,
    medicalHistory: string,
    status: number,
    gender: number,
  ) {
    this.idUser = id;
    this.nameUser = name;
    this.lastnameUser  = lastname;
    this.identificationUser = identification;
    this.phoneUser = phone;
    this.dateUser = date;
    this.epsUser = eps;
    this.medicalHistoryUser = medicalHistory;
    this.statusUser = status;
    this.genderUser = gender;
  }
}
