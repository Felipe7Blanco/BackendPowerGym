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

@Entity({ name: 'acces', schema: 'public' })
export class acces {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_user' })
  public idUser: number;

  @Column({ type: 'varchar', name: 'name_acces', length: 250, nullable: false })
  public nameAcces: string;

  @Column({ type: 'varchar', name: 'password_access', nullable: false })
  public passwordAccess: string;

  

  //foranea con users
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
