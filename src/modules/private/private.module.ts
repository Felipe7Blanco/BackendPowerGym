import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';

import { BilldetailsModule } from './billdetails/billdetails.module';
import { MembershipModule } from './membership/membership.module';
import { MedicalreportsModule } from './medicalreports/medicalreports.module';

import { BillsModule } from './bills/bills.module';

import { UsermembershipsModule } from './usermemberships/usermemberships.module';
import { AccesModule } from '../public/acces/acces.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [AccesModule, UsersModule, RolesModule, UsermembershipsModule, MembershipModule, MedicalreportsModule, BilldetailsModule
    , BillsModule,  BilldetailsModule, ProductsModule]
})
export class PrivateModule {}
