import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Memberships } from 'src/models/memberships/memberships';
import { DataSource } from 'typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MembershipService {

    private  membershipService: Repository<Memberships>;
        
            constructor(private poolConexion: DataSource){
                this.membershipService=poolConexion.getRepository(Memberships);
            }
        
            /**Metodo que evita la duplacidad de Memberships */
            public async verificarMemberships(nombre:string):Promise<boolean>{
                try{
                    const existe = await this.membershipService.findBy({nameMembership: nombre});
                    return existe.length > 0;
                }catch(miError){
                    throw new HttpException('no hay envio de información', HttpStatus.CONFLICT);
                }
            }   
        
            /**Metodo post para registar un Memberships */
            public async registrar(objMemberships: Memberships):Promise<any>{
                try{
                    if (await this.verificarMemberships(objMemberships.nameMembership)){
                        return new HttpException('El Memberships ya existe en la base de datos', HttpStatus.BAD_REQUEST);
                    }
                    else{
                        return await this.membershipService.save(objMemberships);
                    }
                }catch(mierror){
                    throw new HttpException('Hubo un error al realizar el registro', HttpStatus.BAD_REQUEST);
                }
            }
        
            /**Metodo para consultar todos los Memberships */
            public async consultar():Promise<any>{
                try{
                    return this.membershipService.find();
                }catch(miError){
                    throw new HttpException('Error al consultar los Memberships', HttpStatus.BAD_REQUEST);
                }
            }
            /**consultar un Memberships por el id */
            public async consultarUno(codigo:number):Promise<any>{
                try {
                    return this.membershipService.findBy({idMembership:codigo});
                } catch (miError) {
                    throw new HttpException('Error al consultar', HttpStatus.BAD_REQUEST);
                }
            }
        
            /**consultar un Memberships por el nombre */
            public async consultarXname(objMemberships:Memberships){
                try {
                    if (await this.verificarMemberships(objMemberships.nameMembership)){
                        return this.membershipService.findBy({nameMembership:objMemberships.nameMembership});
                    } else{
                        throw new HttpException('No existe este registro', HttpStatus.BAD_REQUEST);
                    }
                    
                } catch (mierror) {
                    throw new HttpException('Error al consultar', HttpStatus.BAD_REQUEST);
                    
                }
            }
        
            /**Actualizar el Memberships */
            public async actualizar(objMemberships: Memberships, codigo:number):Promise<any>{
                try {
                    if(await this.verificarMemberships(objMemberships.nameMembership)){
                        return new HttpException('El Memberships ya existe', HttpStatus.BAD_REQUEST);
        
                    }else{
                        const objActualizado = this.membershipService.update({idMembership: codigo}, objMemberships);
                        return new HttpException({mensaje:"Memberships actualizado", objeto: objActualizado}, HttpStatus.OK);
                    }
                } catch (miError) {
                    throw new HttpException('Erro al actualizar', HttpStatus.BAD_REQUEST);
                }
            }
        
            /**Metodo eliminar */
            public async eliminar(codigo: number): Promise<any>{
                try {
                    return this.membershipService.delete({idMembership: codigo});
                } catch (miErro) {
                    throw new HttpException('Error al elminar el Memberships', HttpStatus.BAD_REQUEST);
                }
            }
}
