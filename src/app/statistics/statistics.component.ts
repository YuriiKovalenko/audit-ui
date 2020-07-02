import { subHours, addHours } from 'date-fns';
import {
  BehaviorSubject,
  Observable,
  Subject,
  timer,
  combineLatest,
  Subscription,
  of,
} from 'rxjs';
import {
  switchMap,
  shareReplay,
  withLatestFrom,
  catchError,
  pluck,
} from 'rxjs/operators';

import { DataSource } from '@angular/cdk/table';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Rule } from '../rules/rule.model';
import { RulesService } from '../rules/rules.service';
import { Statistics } from './statistics.model';
import { StatisticsService } from './statistics.service';

const MILLISECONDS_IN_HOUR = 3600 * 1000;

type Interval = { value: number; name: string; key: string };

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
  public summary: Statistics;
  private summarySub: Subscription;
  public lines: number[];
  private linesSub: Subscription;
  public rules: Rule[];
  public intervals: Interval[];
  public interval: Interval;

  constructor(
    private readonly statisticsService: StatisticsService,
    private readonly rulesService: RulesService
  ) {
    this.rules = [];
    this.intervals = [
      { value: 1, name: '1 хв', key: 'minute' },
      { value: 5, name: '5 хв', key: 'minute' },
      { value: 10, name: '10 хв', key: 'minute' },
      { value: 20, name: '20 хв', key: 'minute' },
      { value: 1, name: '1 год', key: 'hour' },
    ];
    this.interval = this.intervals[4];
  }

  ngOnInit(): void {
    const now = new Date();
    const range: [Date, Date] = [subHours(now, 12), addHours(now, 2)];
    this.timeRangeChange = new BehaviorSubject(range);
    this.schemeStateChange = new Subject();
    this.setupStreams();
  }

  ngOnDestroy() {
    this.timeRangeChange.complete();
    this.summarySub.unsubscribe();
    this.linesSub.unsubscribe();
  }

  private setupStreams() {
    this.rulesService.getRules().subscribe((rules) => {
      this.rules = rules;
    });
    this.summarySub = combineLatest([
      this.timeRangeChange.asObservable(),
      timer(0, 30000),
    ])
      .pipe(
        switchMap(([timeRange]) => {
          const [startDate, endDate] = timeRange;
          return this.statisticsService.getSummary(startDate, endDate);
        }),
        catchError(() => of(this.summary))
      )
      .subscribe(
        (sum) => (this.summary = sum),
        (err) => {
          console.log(err);
        }
      );
    this.statistics$ = combineLatest([
      this.timeRangeChange.asObservable(),
      timer(0, 30000),
    ]).pipe(
      switchMap(([timeRange]) => {
        const [startDate, endDate] = timeRange;
        return this.statisticsService.getStatisticsHourly(startDate, endDate);
      }),
      catchError(() => this.statistics$)
    );
    this.linesSub = combineLatest([
      this.timeRangeChange.asObservable(),
      timer(0, 30000),
    ])
      .pipe(
        switchMap(([timeRange]) => {
          const [startDate, endDate] = timeRange;
          return this.statisticsService.getLines(startDate, endDate);
        }),
        pluck('lines'),
        catchError(() => of(this.lines))
      )
      .subscribe((data) => (this.lines = data));
  }

  onRangeChange(value: [Date, Date]) {
    this.timeRangeChange.next(value);
  }

  getReport() {
    const [start, end] = this.timeRangeChange.getValue();
    const { key, value } = this.interval;
    window.open(
      `/api/statistics/report?startDate=${start.toISOString()}&endDate=${end.toISOString()}&key=${key}&interval=${value}`
    );
  }
}
