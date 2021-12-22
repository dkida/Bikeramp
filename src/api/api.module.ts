import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { CalculateDistance } from './calculateDistance.service';
import { CreateDate } from './createDate.service';
import { TripsRepository } from './trips.repository';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([TripsRepository])],
  controllers: [ApiController],
  providers: [ApiService, CalculateDistance, CreateDate],
})
export class ApiModule {}
