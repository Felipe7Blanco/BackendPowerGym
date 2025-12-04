import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "../users/users";

@Entity({name:"medicalrecords", schema:"public"})
export class MedicalRecords {

    @PrimaryGeneratedColumn({type:"integer", name:"id_medical"})
    public idMedical: number;

    @Column({type:"varchar", name:"blood_type"})
    public bloodtype:String;

    @Column({type:"varchar", name:"emergencyphone"})
    public emergencyphone:string;

    @Column({type:"varchar", name:"nameemergency"})
    public nameemergency:String;

    @Column({type:"varchar", name:"allergies"})
    public allergies:String;

    @Column({type:"varchar", name:"medical_conditions"})
    public medical_conditions:String;

    @Column({type:"date", name:"last_update"})
    public last_update:Date;

    /** forenea con Users */
    @OneToOne(() => Users, (objUser:Users) => objUser.id_medicalRecord)
    @JoinColumn({name:"idUser", referencedColumnName:"idUser"})
    public idUserM?:Users[];


    /**Constructor */
    constructor(id:number, blood:String, emergencyp:string, emergencyn:String, 
        allergies:String, medicalc:String, last:Date
    ){
        this.idMedical=id;
        this.bloodtype=blood;
        this.emergencyphone=emergencyp;
        this.nameemergency=emergencyn;
        this.allergies=allergies;
        this.medical_conditions=medicalc;
        this.last_update=last;
    }


}
