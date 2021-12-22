import { Injectable } from '@nestjs/common';
import { CalculateDistance } from './calculateDistance.service';
import { CreateDate } from './createDate.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { Trip } from './trip.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ApiService {
  constructor(
    private readonly calculateDistance: CalculateDistance,
    private readonly createDate: CreateDate,
  ) {}

  private trips: Trip[] = [];

  async createNewTrip(CreateTripDto: CreateTripDto): Promise<Trip> {
    const { start_address, destination_address, price } = CreateTripDto;

    const distance = await this.calculateDistance.calculateDistance(
      start_address,
      destination_address,
    );
    const trip: Trip = {
      id: uuid,
      distance,
      price,
      date: this.createDate.createDate(),
    };

    this.trips.push(trip);
    return trip;
  }
}
