import { Injectable } from '@nestjs/common';
import { CalculateDistance } from 'src/utils/calculateDistance';
import { CreateTripDto } from './dto/create-trip.dto';
import { Trip } from './trip.entity';
import { TripsRepository } from './trips.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ApiService {
  constructor(
    private readonly calculateDistance: CalculateDistance,
    @InjectRepository(TripsRepository)
    private tripRepository: TripsRepository,
  ) {}

  async createNewTrip(CreateTripDto: CreateTripDto): Promise<Trip> {
    const { start_address, destination_address, date } = CreateTripDto;

    const distance = await this.calculateDistance.calculateDistance(
      start_address,
      destination_address,
    );

    return this.tripRepository.createTrip(CreateTripDto, distance, date);
  }

  async getWeeklyStats() {
    const weeklyTripsObject = this.tripRepository.getWeeklyStats();
    let totalDistance = 0;
    let totalPrice = 0;

    (await weeklyTripsObject).forEach((trip) => {
      totalDistance += trip.distance;
      totalPrice += trip.price;
    });

    return {
      total_distance: totalDistance.toString() + 'km',
      total_price: totalPrice.toString() + 'PLN',
    };
  }
}
