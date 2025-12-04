import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Memberships } from "../memberships/memberships";
import { Users } from "../users/users";

@Entity({name:"usermemberships", schema:"public"})
export class Usermemberships {

    @PrimaryGeneratedColumn({type:"integer", name:"id_userm"})
    public idUserM:number;

    @Column({type:"date", name:"stardate"})
    public stardate:Date;
    @Column({type:"date", name:"enddate"})
    public enddate:Date;
    @Column({type:"integer", name:"status"})
    public status:number;

    /**foranea con membership uno a muchos aquí */
    @OneToMany(()=> Memberships,(objMember:Memberships)=>objMember.userMemberships)
    @JoinColumn({name:"idMembership", referencedColumnName:"idMembership"})
    public idMemShip?: Memberships[];

    /**foranea con users 1 a 1 */
    @ManyToOne(()=>Users,(objUser:Users)=>objUser.idUser)
    @JoinColumn({name:"idUserUM", referencedColumnName:"idUser"})
    public idUserUM?: Users[];

    constructor(id:number, start:Date, end:Date, status:number){

        this.idUserM=id;
        this.stardate=start;
        this.enddate=end;
        this.status=status;

    }


}
