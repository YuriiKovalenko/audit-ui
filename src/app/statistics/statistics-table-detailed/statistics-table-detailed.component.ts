import { Observable } from 'rxjs';

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Statistics } from '../statistics.model';
import { StatisticsService } from '../statistics.service';

@Component({
  selector: 'app-statistics-table-detailed',
  templateUrl: './statistics-table-detailed.component.html',
  styleUrls: ['./statistics-table-detailed.component.scss'],
})
export class StatisticsTableDetailedComponent implements OnInit {
  public displayedColumns: string[];
  public statistics$: Observable<Statistics[]>;

  constructor(
    private readonly statisticsService: StatisticsService,
    @Inject(MAT_DIALOG_DATA) public data: { startDate: Date; endDate: Date }
  ) {
    this.displayedColumns = [
      'range',
      'fillFailed',
      'inspectFailed',
      'readyFailed',
      'start',
      'covered',
      'checked',
      'ready',
    ];
  }

  ngOnInit(): void {
    this.statistics$ = this.statisticsService.getStatisticsByTimeframe(
      this.data.startDate,
      this.data.endDate
    );
  }
}
