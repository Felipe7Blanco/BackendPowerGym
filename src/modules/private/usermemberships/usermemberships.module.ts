import { Module } from '@nestjs/common';
import { UsermembershipsService } from './usermemberships.service';
import { UsermembershipsController } from './usermemberships.controller';

@Module({
  providers: [UsermembershipsService],
  controllers: [UsermembershipsController]
})
export class UsermembershipsModule {}
