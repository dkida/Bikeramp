import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateDate {
  createDate(): string {
    const currentDate = new Date();
    const cDay = currentDate.getDate();
    const cMonth = currentDate.getMonth() + 1;
    const cYear = currentDate.getFullYear();
    const date = `${cDay}.${cMonth}.${cYear}`;
    return date;
  }
}
