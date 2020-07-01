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

  public getSummary(startDate: Date, endDate: Date) {
    return this.http.get<Statistics>('/statistics/summary', {
      params: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
    });
  }

  public getLines(startDate: Date, endDate: Date) {
    return this.http.get<{ lines: number[] }>(
      '/statistics/lines',
      {
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
      }
    );
  }

  private mapStats(stats: Statistics[]) {
    return stats.map((stat) => ({
      ...stat,
      createdAt: new Date(stat.createdAt),
      fillFailed: stat.start - stat.covered,
      inspectFailed: stat.covered - stat.checked,
      readyFailed: stat.checked - stat.ready,
    }));
  }
}
