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

// 1. Importamos las etiquetas de Swagger para documentar las propiedades
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// Decorador para exportar la clase como tabla a la BD
@Entity({ name: 'users', schema: 'public' })
export class Users {
  // ==========================================================================
  // COLUMNAS DE LA TABLA (PROPIEDADES BÁSICAS)
  // ==========================================================================

  /*@ApiProperty({
    description: 'Identificador único autoincrementable del usuario',
    example: 1,
  })*/
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_user' })
  public idUser: number;

  @ApiProperty({ description: 'Nombres del usuario', example: 'Juanito' })
  @Column({ type: 'varchar', name: 'name_user', length: 250, nullable: false })
  public nameUser: string;

  @ApiProperty({ description: 'Apellidos del usuario', example: 'Pérez' })
  @Column({
    type: 'varchar',
    name: 'last_name_user',
    length: 250,
    nullable: false,
  })
  public lastnameUser: string;

  @ApiProperty({
    description: 'Documento de identidad del usuario',
    example: '0123456789',
  })
  @Column({
    type: 'varchar',
    name: 'identification_user',
    length: 10,
    nullable: false,
  })
  public identificationUser: string;

  @ApiProperty({
    description: 'Número de teléfono de contacto',
    example: '3101234567',
  })
  @Column({ type: 'varchar', name: 'phone_user', length: 10, nullable: false })
  public phoneUser: string;

  @ApiProperty({
    description: 'Fecha de nacimiento o registro del usuario',
    example: '1995-10-15',
  })
  @Column({ type: 'date', name: 'date_user', nullable: false })
  public dateUser: Date;

  @ApiProperty({
    description: 'Entidad Promotora de Salud (EPS) del usuario',
    example: 'Sanitas',
  })
  @Column({ type: 'varchar', name: 'eps_user', length: 250, nullable: false })
  public epsUser: string;

  // Usamos ApiPropertyOptional porque en TypeORM está nullable: true
  @ApiPropertyOptional({
    description: 'Antecedentes médicos relevantes para el gimnasio',
    example: 'Lesión en rodilla derecha',
  })
  @Column({ type: 'varchar', name: 'medical_history_user', nullable: true })
  public medicalHistoryUser: string;

  @ApiProperty({
    description:
      'Estado del usuario (ej. 1 Activo, 0 Inactivo para soft delete)',
    example: 1,
  })
  @Column({ type: 'integer', name: 'status_user', nullable: false })
  public statusUser: number;

  @ApiProperty({
    description: 'Género biológico o identidad (ej. 1 Masculino, 2 Femenino)',
    example: 1,
  })
  @Column({ type: 'integer', name: 'gender_user', nullable: false })
  public genderUser: number;

  // ==========================================================================
  // RELACIONES CON OTRAS TABLAS
  // Nota: Usualmente no se exigen en la creación básica, por lo que las
  // documentamos como opcionales para no saturar el JSON de ejemplo en Swagger.
  // ==========================================================================

  @ApiPropertyOptional({
    description: 'ID del Rol asignado al usuario',
    example: 1,
  })
  @ManyToOne(() => Roles, (objRole: Roles) => objRole.User, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'id_rol_user', referencedColumnName: 'idRol' })
  public idRolUser?: Roles[];

  //@ApiPropertyOptional({ description: 'ID de Facturas asociadas al usuario', example:1 })
  @OneToMany(() => Bills, (objBill: Bills) => objBill.id_user_bill, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  public idUserBill?: Bills[];

  //@ApiPropertyOptional({ description: 'ID de Registro médico extendido del usuario', example: 1 })
  @OneToOne(
    () => MedicalRecords,
    (objMedical: MedicalRecords) => objMedical.idUserM,
  )
  public id_medicalRecord?: MedicalRecords[];

  //@ApiPropertyOptional({ description: 'ID Credenciales de acceso del usuario', example:1 })
  @OneToMany(() => acces, (objAcces: acces) => objAcces.user, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  public access?: acces[];

  //@ApiPropertyOptional({ description: 'ID Historial de membresías del usuario', example:1})
  @OneToMany(
    () => Usermemberships,
    (objUserMem: Usermemberships) => objUserMem.idUserM,
  )
  public usermembers?: Usermemberships[];

  // ==========================================================================
  // CONSTRUCTOR
  // ==========================================================================
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
    this.lastnameUser = lastname;
    this.identificationUser = identification;
    this.phoneUser = phone;
    this.dateUser = date;
    this.epsUser = eps;
    this.medicalHistoryUser = medicalHistory;
    this.statusUser = status;
    this.genderUser = gender;
  }
}
