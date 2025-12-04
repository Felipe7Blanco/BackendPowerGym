import { Global, Module } from '@nestjs/common';
import { Inject } from "@nestjs/common";
import { acces } from 'src/models/acces/acces';
import { BillDetails } from 'src/models/billDetails/billdetails';
import { Bills } from 'src/models/bills/bills';
import { MedicalRecords } from 'src/models/medical-records/medical-records';
import { Memberships } from 'src/models/memberships/memberships';
import { Products } from 'src/models/products/products';
import { Roles } from 'src/models/roles/roles';
import { Usermemberships } from 'src/models/usermemberships/usermemberships';
import { Users } from 'src/models/users/users';
//librerias para que se generen automaticamente las entidades en la 
//bd
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";



@Global()
@Module({
  imports: [],
  providers: [
    {provide: DataSource,
        inject:[],
        useFactory:async () =>{
            try{
                const poolConnection = new DataSource({
                    type: 'postgres',
                    host:String(process.env.HOST),
                    port:Number(process.env.PORT),
                    username:String(process.env.USER),
                    password:String(process.env.PASSWORD),
                    database:String(process.env.DATA_BASE),
                    synchronize:true,
                    logging:true,
                    namingStrategy: new SnakeNamingStrategy(),
                    /**Importamos las clases para que se generen como tablas en la bd */
                    entities:[Roles, Users, acces, Bills, BillDetails, Memberships, 
                        Usermemberships, Products, MedicalRecords
                    ]
            });
            await poolConnection.initialize();
            console.log("conexión exitosa con la base de datos: " +String(process.env.DATA_BASE));
            return poolConnection;
        } catch(miError){
            console.log("hubo un fallo al realizar la conexión con la base de datos");
            throw miError;
        }
        }

  }],
  controllers: [],
  exports: [DataSource],
})

export class ConnectionModule {}
