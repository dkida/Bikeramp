import { EntityRepository, Repository } from 'typeorm';
import { CreateTripDto } from './dto/create-trip.dto';
import { Trip } from './trip.entity';

@EntityRepository(Trip)
export class TripsRepository extends Repository<Trip> {
  async createTrip(
    createTripDto: CreateTripDto,
    distance: number,
    date: string,
  ): Promise<Trip> {
    const { price } = createTripDto;

    const trip = this.create({
      distance,
      price,
      date,
    });

    await this.save(trip);
    return trip;
  }
}
