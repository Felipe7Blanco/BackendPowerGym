import { Module } from '@nestjs/common';
import { BilldetailsService } from './billdetails.service';
import { BilldetailsController } from './billdetails.controller';

@Module({
  providers: [BilldetailsService],
  controllers: [BilldetailsController]
})
export class BilldetailsModule {}
