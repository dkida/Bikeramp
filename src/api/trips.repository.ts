import { EntityRepository, Raw, Repository } from 'typeorm';
import { CreateTripDto } from './dto/create-trip.dto';
import { Trip } from './trip.entity';

@EntityRepository(Trip)
export class TripsRepository extends Repository<Trip> {
  async createTrip(
    createTripDto: CreateTripDto,
    distance: number,
    date: Date,
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

  private getWeekAgoDate(): String {
    const weekAgoDate = new Date();
    weekAgoDate.setDate(weekAgoDate.getDate() - 7);
    const formattedDate = `${weekAgoDate.getFullYear()}-${
      weekAgoDate.getMonth() + 1
    }-${weekAgoDate.getDate()}`;

    return formattedDate;
  }

  async getWeeklyStats(): Promise<Trip[]> {
    const currentDate = new Date();
    const weekAgoDate = this.getWeekAgoDate();

    const query = this.createQueryBuilder('trip');
    query.where(':currentDate > trip.date AND trip.date > :weekAgoDate', {
      currentDate: currentDate,
      weekAgoDate: weekAgoDate,
    });

    const weeklyTrips = await query.getMany();
    return weeklyTrips;
  }

  async getMonthlyStats(): Promise<Trip[]> {
    const currentDate = new Date();
    const lastDayOfTheMonth = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getDate()}`;

    const query = this.createQueryBuilder('trip');
    query
      .where(`trip.date >= date_trunc('month', CURRENT_DATE)`)
      .andWhere(`trip.date <= :lastDayOfTheMonth`, {
        lastDayOfTheMonth: lastDayOfTheMonth,
      })
      .orderBy('trip.date');
    const monthlyTrips = await query.getMany();
    return monthlyTrips;
  }
}
