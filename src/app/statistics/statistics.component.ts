import { combineLatest, Observable, Subject, BehaviorSubject } from 'rxjs';
import { switchMap, debounceTime, tap } from 'rxjs/operators';

import { DataSource } from '@angular/cdk/table';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Statistics } from './statistics.model';
import { StatisticsService } from './statistics.service';

const MILLISECONDS_IN_HOUR = 3600 * 1000;

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, OnDestroy {
  public dataSource: DataSource<Statistics[]>;
  public displayedColumns: string[];
  public statistics$: Observable<Statistics[]>;
  public statistics: Statistics[];
  public timeRangeChange: BehaviorSubject<[Date, Date]>;
  public displayTimeRangeChange: BehaviorSubject<[Date, Date]>;
  public startDate: Date;
  public endDate: Date;

  constructor(private readonly statisticsService: StatisticsService) {
    const currentTime = Date.now();
    this.startDate = new Date(currentTime - MILLISECONDS_IN_HOUR);
    this.endDate = new Date(currentTime + MILLISECONDS_IN_HOUR);
    this.timeRangeChange = new BehaviorSubject([this.startDate, this.endDate]);
    this.displayTimeRangeChange = new BehaviorSubject([this.startDate, this.endDate]);
  }

  ngOnInit(): void {
    this.statistics$ = this.timeRangeChange.asObservable().pipe(
      switchMap(timeRange => {
        const [startDate, endDate] = timeRange;
        console.log(JSON.stringify(timeRange));
        return this.statisticsService.getStatisticsByTimeframe(
          startDate,
          endDate
        );
      }),
      tap(statistics => {
        if (!this.statistics) {
          this.statistics = statistics;
        }
      })
    );
  }

  ngOnDestroy() {
    this.timeRangeChange.complete();
    this.displayTimeRangeChange.complete();
  }

  onRangeChange(value) {
    this.timeRangeChange.next(value);
  }
}
