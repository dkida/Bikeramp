import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { CalculateDistance } from './calculateDistance.service';
import { CreateDate } from './createDate.service';

@Module({
  imports: [HttpModule],
  controllers: [ApiController],
  providers: [ApiService, CalculateDistance, CreateDate],
})
export class ApiModule {}
