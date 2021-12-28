import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CalculateDistance {
  constructor(private httpService: HttpService) {}

  async calculateDistance(
    startAddress: string,
    destinationAddress: string,
  ): Promise<number> {
    const API_KEY = 'AIzaSyDOeam-slK_8ev-PO39xicM_bFkOSm_Lw0';
    const URL = encodeURI(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${startAddress}&destination=${destinationAddress}&key=${API_KEY}`,
    );

    try {
      const response: AxiosResponse = await lastValueFrom(
        this.httpService.get(URL),
      );
      const distance: number = Number(response.data.legs.distance.text);
      console.log(distance);
      return distance;
    } catch {
      throw new HttpException(
        'Please provide a valid location',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
