import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Memberships } from '../memberships/memberships';
import { Users } from '../users/users';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
@Entity({ name: 'usermemberships', schema: 'public' })
export class Usermemberships {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_userm' })
  public idUserM: number;

  @ApiProperty({ description: 'Fecha de inicio', example: '2020-10-12' })
  @Column({ type: 'date', name: 'stardate' })
  public stardate: Date;

  @ApiProperty({ description: 'Fecha de fin', example: '2021-10-12' })
  @Column({ type: 'date', name: 'enddate' })
  public enddate: Date;

  @ApiProperty({ description: 'Estado de la membresía', example: 1 })
  @Column({ type: 'integer', name: 'status' })
  public status: number;

  /**foranea con membership uno a muchos aquí */
  @ApiPropertyOptional({ description: 'ID de la membresía asignado al usuario', example:1 })
  @OneToMany(
    () => Memberships,
    (objMember: Memberships) => objMember.userMemberships,
  )
  @JoinColumn({ name: 'idMembership', referencedColumnName: 'idMembership' })
  public idMemShip?: Memberships[];

  /**foranea con users 1 a 1 */
  @ApiPropertyOptional({ description: 'ID del usuario', example:1 })
  @ManyToOne(() => Users, (objUser: Users) => objUser.idUser)
  @JoinColumn({ name: 'idUserUM', referencedColumnName: 'idUser' })
  public idUserUM?: Users[];

  constructor(id: number, start: Date, end: Date, status: number) {
    this.idUserM = id;
    this.stardate = start;
    this.enddate = end;
    this.status = status;
  }
}
