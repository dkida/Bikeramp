import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalculateDistance } from 'src/utils/calculateDistance';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { TripsRepository } from './trips.repository';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([TripsRepository])],
  controllers: [ApiController],
  providers: [ApiService, CalculateDistance],
})
export class ApiModule {}
