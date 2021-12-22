import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CalculateDistance {
  constructor(private httpService: HttpService) {}

  async calculateDistance(
    start_address: string,
    destination_address: string,
  ): Promise<number> {
    const URL = [
      `https://nominatim.openstreetmap.org/?addressdetails=1&q=${encodeURIComponent(
        start_address,
      )}&format=json&limit=1`,
      `https://nominatim.openstreetmap.org/?addressdetails=1&q=${encodeURIComponent(
        destination_address,
      )}&format=json&limit=1`,
    ];

    try {
      const startResponse: AxiosResponse = await lastValueFrom(
        this.httpService.get(URL[0]),
      );
      const startCoords = startResponse.data[0];

      const destinationResponse: AxiosResponse = await lastValueFrom(
        this.httpService.get(URL[1]),
      );
      const destinationCoords = destinationResponse.data[0];

      const coords = {
        start_lat: startCoords.lat,
        start_lon: startCoords.lon,
        end_lat: destinationCoords.lat,
        end_lon: destinationCoords.lon,
      };

      const distanceURL = `http://router.project-osrm.org/route/v1/bike/${encodeURIComponent(
        coords.start_lat,
      )},${encodeURIComponent(coords.start_lon)};${encodeURIComponent(
        coords.end_lat,
      )},${encodeURIComponent(coords.end_lon)}`;

      const distanceResponse: AxiosResponse = await lastValueFrom(
        this.httpService.get(distanceURL),
      );
      const startWaypoint = distanceResponse.data.waypoints[0].distance;
      const destinationWaypoint = distanceResponse.data.waypoints[1].distance;
      const distance = (destinationWaypoint - startWaypoint) / 1000;
      return distance;
    } catch {
      throw new HttpException(
        'Please provide a valid location',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
