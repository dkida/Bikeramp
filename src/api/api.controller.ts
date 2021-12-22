import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiService } from './api.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { Trip } from './trip.entity';

@Controller('api')
export class ApiController {
  constructor(private apiService: ApiService) {}

  @Post('trips')
  createNewTrip(@Body() createTripDto: CreateTripDto): Promise<Trip> {
    return this.apiService.createNewTrip(createTripDto);
  }

  //TODO

  // @Get('/stats/weekly')
  // getWeeklyStats() {

  // }

  // @Get('stats/monthly')
  // getMonthlyStats() {

  // }
}
