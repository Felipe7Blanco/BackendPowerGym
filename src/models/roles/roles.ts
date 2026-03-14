import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from '../users/users';
// Importamos las etiquetas de Swagger para documentar las propiedades
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity({ name: 'roles', schema: 'public' })
export class Roles {
  //columna PK
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_rol' })
  public idRol: number;

  @ApiProperty({ description: 'Nombres del rol', example: 'User' })
  @Column({ type: 'varchar', length: 250, name: 'name_rol', nullable: false })
  public nameRol: string;

  @ApiProperty({ description: 'Estados del rol', example: '1' })
  @Column({ type: 'integer', name: 'status_rol', nullable: false })
  public statusRol: number;

  //foranea, muchos roles un usuario
  @ManyToOne(() => Users, (objUser: Users) => objUser.idRolUser)
  public User?: Users[];

  constructor(cod: number, name: string, status: number) {
    this.idRol = cod;
    this.nameRol = name;
    this.statusRol = status;
  }
}
