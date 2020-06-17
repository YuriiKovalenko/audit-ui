import { subHours } from 'date-fns';
import {
  BehaviorSubject,
  Observable,
  Subject,
  timer,
  combineLatest,
} from 'rxjs';
import { switchMap, shareReplay, withLatestFrom } from 'rxjs/operators';

import { DataSource } from '@angular/cdk/table';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Rule } from '../rules/rule.model';
import { RulesService } from '../rules/rules.service';
import { Statistics } from './statistics.model';
import { StatisticsService } from './statistics.service';

const MILLISECONDS_IN_HOUR = 3600 * 1000;

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit, OnDestroy {
  public dataSource: DataSource<Statistics[]>;
  public displayedColumns: string[];
  public statistics$: Observable<Statistics[]>;
  public timeRangeChange: BehaviorSubject<[Date, Date]>;
  public schemeStateChange: Subject<any>;
  public rules: Rule[];

  constructor(
    private readonly statisticsService: StatisticsService,
    private readonly rulesService: RulesService
  ) {
    this.rules = [];
  }

  ngOnInit(): void {
    const now = new Date();
    const range: [Date, Date] = [subHours(now, 12), now];
    this.timeRangeChange = new BehaviorSubject(range);
    this.schemeStateChange = new Subject();
    this.rulesService.getRules().subscribe((rules) => {
      this.rules = rules;
    });
    this.statistics$ = combineLatest([
      this.timeRangeChange.asObservable(),
      timer(0, 30000),
    ]).pipe(
      switchMap(([timeRange]) => {
        const [startDate, endDate] = timeRange;
        return this.statisticsService.getStatisticsHourly(startDate, endDate);
      })
    );
  }

  ngOnDestroy() {
    this.timeRangeChange.complete();
  }

  onRangeChange(value) {
    this.timeRangeChange.next(value);
  }
}
