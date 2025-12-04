import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Roles } from 'src/models/roles/roles';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class RolesService {
    private  rolRepository: Repository<Roles>;

    constructor(private poolConexion: DataSource){
        this.rolRepository=poolConexion.getRepository(Roles);
    }

    /**Metodo que evita la duplacidad de roles */
    public async verificarRol(nombre:string):Promise<boolean>{
        try{
            const existe = await this.rolRepository.findBy({nameRol: nombre});
            return existe.length > 0;
        }catch(miError){
            throw new HttpException('no hay envio de información', HttpStatus.CONFLICT);
        }
    }   

    /**Metodo post para registar un rol */
    public async registrar(objROl: Roles):Promise<any>{
        try{
            if (await this.verificarRol(objROl.nameRol)){
                return new HttpException('El rol ya existe en la base de datos', HttpStatus.BAD_REQUEST);
            }
            else{
                return await this.rolRepository.save(objROl);
            }
        }catch(mierror){
            throw new HttpException('Hubo un error al realizar el registro', HttpStatus.BAD_REQUEST);
        }
    }

    /**Metodo para consultar todos los roles */
    public async consultar():Promise<any>{
        try{
            return this.rolRepository.find();
        }catch(miError){
            throw new HttpException('Error al consultar los roles', HttpStatus.BAD_REQUEST);
        }
    }
    /**consultar un rol por el id */
    public async consultarUno(codigo:number):Promise<any>{
        try {
            return this.rolRepository.findBy({idRol:codigo});
        } catch (miError) {
            throw new HttpException('Error al consultar', HttpStatus.BAD_REQUEST);
        }
    }

    /**consultar un rol por el nombre */
    public async consultarXname(objrol:Roles){
        try {
            if (await this.verificarRol(objrol.nameRol)){
                return this.rolRepository.findBy({nameRol:objrol.nameRol});
            } else{
                throw new HttpException('No existe este registro', HttpStatus.BAD_REQUEST);
            }
            
        } catch (mierror) {
            throw new HttpException('Error al consultar', HttpStatus.BAD_REQUEST);
            
        }
    }

    /**Actualizar el rol */
    public async actualizar(objrol: Roles, codigo:number):Promise<any>{
        try {
            if(await this.verificarRol(objrol.nameRol)){
                return new HttpException('El rol ya existe', HttpStatus.BAD_REQUEST);
            }else{
                const objActualizado = this.rolRepository.update({idRol: codigo}, objrol);
                return new HttpException({mensaje:"Rol actualizado", objeto: objActualizado}, HttpStatus.OK);
            }
        } catch (miError) {
            throw new HttpException('Erro al actualizar', HttpStatus.BAD_REQUEST);
        }
    }

    /**Metodo eliminar */
    public async eliminar(codigo: number): Promise<any>{
        try {
            return this.rolRepository.delete({idRol: codigo});
        } catch (miErro) {
            throw new HttpException('Error al elminar el rol', HttpStatus.BAD_REQUEST);
        }
    }
}


    
