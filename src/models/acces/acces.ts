import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from '../users/users';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity({ name: 'acces', schema: 'public' })
export class acces {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_user' })
  public idUser: number;

  @ApiProperty({ description: 'Correo del usuario', example: 'juan@mail.com' })
  @Column({ type: 'varchar', name: 'name_acces', length: 250, nullable: false })
  public nameAcces: string;


  @ApiProperty({ description: 'Contraseña del usuario', example: '*************' })
  @Column({ type: 'varchar', name: 'password_access', nullable: false })
  public passwordAccess: string;

  //foranea con users
  //@ApiPropertyOptional({ description: 'ID del usuario', example:1 })
  @ManyToOne(() => Users, (objUser) => objUser.access, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'idUser', referencedColumnName: 'idUser' })
  public user?: Users;

  constructor(id: number, name: string, password: string, status: number) {
    this.idUser = id;
    this.nameAcces = name;
    this.passwordAccess = password;
  }
}
