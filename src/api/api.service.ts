import { Injectable } from '@nestjs/common';
import { CalculateDistance } from 'src/utils/calculateDistance';
import { CreateTripDto } from './dto/create-trip.dto';
import { Trip } from './trip.entity';
import { TripsRepository } from './trips.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { weeklyStats } from './trip.model';
import { monthlyStatsDate } from 'src/utils/dateManipulation';

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

  async getWeeklyStats(): Promise<weeklyStats> {
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

  async getMonthlyStats(): Promise<Trip[]> {
    const monthlyTripsObject = await this.tripRepository.getMonthlyStats();
    let shiftedStats = {};
    let monthlyStats = [];
    let dateKeys = [];

    let dateOfATrip;
    monthlyTripsObject.forEach((trip) => {
      if (!(dateOfATrip === trip.date)) {
        dateOfATrip = trip.date;
        dateKeys.push(trip.date);
        shiftedStats[dateOfATrip] = [];
      }

      shiftedStats[dateOfATrip].push(trip);
    });

    for (let i = 0; i < dateKeys.length; i++) {
      let totalDistance = 0;
      let totalPay = 0;
      let avgRideLength = 0;
      let avgPay = 0;
      shiftedStats[dateKeys[i]].forEach((element) => {
        totalDistance += element.distance;
        totalPay += element.price;
      });

      avgRideLength = Math.round(
        totalDistance / shiftedStats[dateKeys[i]].length,
      );
      avgPay = totalPay / shiftedStats[dateKeys[i]].length;
      let total_distance = Math.round(totalDistance) + 'km';
      let avg_price = avgPay.toFixed(2) + 'PLN';
      let avg_ride = avgRideLength.toString() + 'km';
      let date = monthlyStatsDate(dateKeys[i]);
      monthlyStats.push({
        day: date,
        total_distance: total_distance,
        avg_ride: avg_ride,
        avg_price: avg_price,
      });
    }

    return monthlyStats;
  }
}
