import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { subHours } from 'date-fns';

import { DataSource } from '@angular/cdk/table';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Statistics } from './statistics.model';
import { StatisticsService } from './statistics.service';
import { RulesService } from '../rules/rules.service';
import { Rule } from '../rules/rule.model';

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
    this.rulesService.getRules().subscribe(rules => {
      this.rules = rules;
    });
    this.statistics$ = this.timeRangeChange.asObservable().pipe(
      switchMap((timeRange) => {
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
