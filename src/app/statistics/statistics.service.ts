import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Statistics } from './statistics.model';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private readonly http: HttpClient) {}

  public getStatisticsByTimeframe(startDate: Date, endDate: Date) {
    return this.http
      .get<Statistics[]>(`/statistics`, {
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
      })
      .pipe(map((statistics) => this.mapStats(statistics)));
  }

  public getStatisticsHourly(startDate: Date, endDate: Date) {
    return this.http
      .get<Statistics[]>(`/statistics/hourly`, {
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
      })
      .pipe(map((statistics) => this.mapStats(statistics)));
  }

  private mapStats(stats: Statistics[]) {
    return stats.map((stat) => {
      const res = {
        ...stat,
        start: stat.data[3],
        covered: stat.data[11] + stat.data[12] + stat.data[13],
        checked: stat.data[1] + stat.data[2] + stat.data[3],
        ready: stat.data[6] + stat.data[7] + stat.data[8] + stat.data[9],
      };
      return {
        ...res,
        createdAt: new Date(stat.createdAt),
        fillFailed: res.start - res.covered,
        inspectFailed: res.covered - res.checked,
        readyFailed: res.checked - res.ready,
      };
    });
  }
}
