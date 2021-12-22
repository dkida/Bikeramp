import { Injectable } from '@nestjs/common';
import { CalculateDistance } from './calculateDistance.service';
import { CreateDate } from './createDate.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { Trip } from './trip.entity';
import { TripsRepository } from './trips.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ApiService {
  constructor(
    private readonly calculateDistance: CalculateDistance,
    private readonly createDate: CreateDate,
    @InjectRepository(TripsRepository)
    private tripRepository: TripsRepository,
  ) {}

  async createNewTrip(CreateTripDto: CreateTripDto): Promise<Trip> {
    const { start_address, destination_address } = CreateTripDto;

    const distance = await this.calculateDistance.calculateDistance(
      start_address,
      destination_address,
    );
    const date = this.createDate.createDate();

    return this.tripRepository.createTrip(CreateTripDto, distance, date);
  }
}
