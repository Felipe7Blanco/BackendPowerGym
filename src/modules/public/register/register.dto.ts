import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsDate,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class RegisterDto {
  // User fields
  @IsNotEmpty()
  nameUser: string;

  @IsNotEmpty()
  lastnameUser: string;

  @IsNotEmpty()
  identificationUser: string;

  @IsNotEmpty()
  phoneUser: string;

  @IsNotEmpty()
  @Type(() => Date)
  dateUser: Date;

  @IsNotEmpty()
  epsUser: string;

  @IsOptional()
  medicalHistoryUser?: string;

  @IsNotEmpty()
  statusUser: number;

  @IsNotEmpty()
  genderUser: number;

  @IsNotEmpty()
  idRolUser: number;

  // Access fields
  @IsNotEmpty()
  nameAcces: string;

  @IsNotEmpty()
  passwordAccess: string;

  @IsNotEmpty()
  statusAcces: number;

  constructor(){
    
  }



}


