import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Products } from 'src/models/products/products';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class ProductsService {
  private productRepository: Repository<Products>;

  constructor(private poolConexion: DataSource) {
    this.productRepository = poolConexion.getRepository(Products);
  }

  /**Metodo que evita la duplacidad de Products */
  public async verificarProduct(nombre: string): Promise<boolean> {
    try {
      const existe = await this.productRepository.findBy({
        nameProduct: nombre,
      });
      return existe.length > 0;
    } catch (miError) {
      throw new HttpException(
        'no hay envio de información',
        HttpStatus.CONFLICT,
      );
    }
  }

  /**Metodo post para registar un Product */
  public async registrar(objProduct: Products): Promise<any> {
    try {
      if (await this.verificarProduct(objProduct.nameProduct)) {
        return new HttpException(
          'El Product ya existe en la base de datos',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return await this.productRepository.save(objProduct);
      }
    } catch (mierror) {
      throw new HttpException(
        'Hubo un error al realizar el registro',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**Metodo para consultar todos los Products */
  public async consultar(): Promise<any> {
    try {
      return this.productRepository.find();
    } catch (miError) {
      throw new HttpException(
        'Error al consultar los Products',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  /**consultar un Product por el id */
  public async consultarUno(codigo: number): Promise<any> {
    try {
      return this.productRepository.findBy({ idProduct: codigo });
    } catch (miError) {
      throw new HttpException('Error al consultar', HttpStatus.BAD_REQUEST);
    }
  }

  /**consultar un Product por el nombre */
  public async consultarXname(objProduct: Products) {
    try {
      if (await this.verificarProduct(objProduct.nameProduct)) {
        return this.productRepository.findBy({
          nameProduct: objProduct.nameProduct,
        });
      } else {
        throw new HttpException(
          'No existe este registro',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (mierror) {
      throw new HttpException('Error al consultar', HttpStatus.BAD_REQUEST);
    }
  }

  /**Actualizar el Product */
  public async actualizar(objProduct: Products, codigo: number): Promise<any> {
    try {
      if (await this.verificarProduct(objProduct.nameProduct)) {
        return new HttpException(
          'El Product ya existe, intenta con otro nombre',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const objActualizado = this.productRepository.update(
          { idProduct: codigo },
          objProduct,
        );
        return new HttpException(
          { mensaje: 'Product actualizado', objeto: objActualizado },
          HttpStatus.OK,
        );
      }
    } catch (miError) {
      throw new HttpException('Erro al actualizar', HttpStatus.BAD_REQUEST);
    }
  }

  /**softdelete */
  public async softdelete(objProduct: Products, codigo: number): Promise<any> {
    try {
      const objActualizado = this.productRepository.update(
        { idProduct: codigo },
        objProduct,
      );
      return new HttpException(
        { mensaje: 'Product actualizado', objeto: objActualizado },
        HttpStatus.OK,
      );
    } catch (miError) {
      throw new HttpException('Erro al actualizar', HttpStatus.BAD_REQUEST);
    }
  }

  /**Metodo eliminar */
  public async eliminar(codigo: number): Promise<any> {
    try {
      return this.productRepository.delete({ idProduct: codigo });
    } catch (miErro) {
      throw new HttpException(
        'Error al elminar el Product',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
