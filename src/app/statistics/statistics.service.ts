import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Statistics } from './statistics.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  constructor(private readonly http: HttpClient) {}

  public getStatisticsByTimeframe(startDate: Date, endDate: Date) {
    return this.http.get<Statistics>(`/api/statistics`, {
      params: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      }
    });
  }
}
