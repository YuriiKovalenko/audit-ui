import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StatisticsService } from '../statistics/statistics.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private readonly statisticsService: StatisticsService) {}

  public getStatus() {
    // return this.s
  }

  public getCoveredChartData(startDate: Date, endDeate: Date) {
    return this.statisticsService.getStatisticsHourly(startDate, endDeate);
  }
}
