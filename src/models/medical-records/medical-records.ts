import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from '../users/users';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
@Entity({ name: 'medicalrecords', schema: 'public' })
export class MedicalRecords {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_medical' })
  public idMedical: number;


  @ApiProperty({ description: 'Grupo sanguineo del usuario', example: '+A' })
  @Column({ type: 'varchar', name: 'blood_type' })
  public bloodtype: String;

  @ApiProperty({ description: 'Contacto de emergencia', example: '+57 345 678 9012' })
  @Column({ type: 'varchar', name: 'emergencyphone' })
  public emergencyphone: string;

  @ApiProperty({ description: 'Nombre contacto de emergencia', example: 'María' })
  @Column({ type: 'varchar', name: 'nameemergency' })
  public nameemergency: String;

  @ApiProperty({ description: 'Alergías  del usuario', example: 'Maíz' })
  @Column({ type: 'varchar', name: 'allergies' })
  public allergies: String;

  @ApiProperty({ description: 'Condiciones medicas del usuario', example: 'Hipertensión' })
  @Column({ type: 'varchar', name: 'medical_conditions' })
  public medical_conditions: String;

  @ApiProperty({ description: 'Fecha de actualización', example: '2026-10-03' })
  @Column({ type: 'date', name: 'last_update' })
  public last_update: Date;

  /** forenea con Users */
  @ApiProperty({ description: 'ID del usuario', example: 1 })
  @OneToOne(() => Users, (objUser: Users) => objUser.id_medicalRecord)
  @JoinColumn({ name: 'idUser', referencedColumnName: 'idUser' })
  public idUserM?: Users[];

  /**Constructor */
  constructor(
    id: number,
    blood: String,
    emergencyp: string,
    emergencyn: String,
    allergies: String,
    medicalc: String,
    last: Date,
  ) {
    this.idMedical = id;
    this.bloodtype = blood;
    this.emergencyphone = emergencyp;
    this.nameemergency = emergencyn;
    this.allergies = allergies;
    this.medical_conditions = medicalc;
    this.last_update = last;
  }
}
