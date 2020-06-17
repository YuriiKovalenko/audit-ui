import { Component, OnInit, Inject } from '@angular/core';
import { StatisticsService } from '../statistics.service';
import { Observable } from 'rxjs';
import { Statistics } from '../statistics.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
      'checked',
      'covered',
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
