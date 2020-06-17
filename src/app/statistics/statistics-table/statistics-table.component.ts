import { addSeconds } from 'date-fns';
import { Observable, Subject } from 'rxjs';

import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Rule } from '../../rules/rule.model';
import {
  StatisticsTableDetailedComponent
} from '../statistics-table-detailed/statistics-table-detailed.component';
import { Statistics } from '../statistics.model';

@Component({
  selector: 'app-statistics-table',
  templateUrl: './statistics-table.component.html',
  styleUrls: ['./statistics-table.component.scss'],
})
export class StatisticsTableComponent implements OnInit {
  public displayedColumns: string[];
  @Input() statistics$: Observable<Statistics>;
  @Input() rules: Rule[];
  @Input() schemeStateChange: Subject<{ property: string; value: number }>;

  constructor(private dialog: MatDialog) {
    this.displayedColumns = [
      'range',
      'status',
      'start',
      'covered',
      'checked',
      'ready',
      // 'working'
    ];
  }

  public getRuleForProperty(name: string) {
    return this.rules.find((rule) => rule.propertyName === name);
  }

  ngOnInit(): void {}

  public openDetailedTable(startDate: Date) {
    const endDate = addSeconds(startDate, 3599);
    this.dialog.open(StatisticsTableDetailedComponent, {
      data: { startDate, endDate },
      width: '90%',
      height: '90%',
    });
  }

  public highlightScheme(propertyName: string, element: Statistics) {
    this.schemeStateChange.next({
      property: propertyName,
      value: element[propertyName],
    });
  }
}
