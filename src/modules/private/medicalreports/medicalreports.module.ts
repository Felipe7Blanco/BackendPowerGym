import { Module } from '@nestjs/common';
import { MedicalreportsService } from './medicalreports.service';
import { MedicalreportsController } from './medicalreports.controller';

@Module({
  providers: [MedicalreportsService],
  controllers: [MedicalreportsController]
})
export class MedicalreportsModule {}
