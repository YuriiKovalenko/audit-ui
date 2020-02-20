import { combineLatest, Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { DataSource } from '@angular/cdk/table';
import { Component, OnInit } from '@angular/core';

import { Statistics } from './statistics.model';
import { StatisticsService } from './statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  public dataSource: DataSource<Statistics>;
  public displayedColumns: string[];
  public statistics$: Observable<Statistics>;
  public timeRangeChange: Subject<[Date, Date]>;

  constructor(private readonly statisticsService: StatisticsService) {
    this.timeRangeChange = new Subject();
  }

  ngOnInit(): void {
    this.statistics$ = combineLatest([
      this.timeRangeChange.asObservable()
    ]).pipe(
      switchMap(([timeRange]) => {
        const [startDate, endDate] = timeRange;
        return this.statisticsService.getStatisticsByTimeframe(
          startDate,
          endDate
        );
      })
    );
  }

  onRangeChange(value) {
    this.timeRangeChange.next(value);
  }
}
