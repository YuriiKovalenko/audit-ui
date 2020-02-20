import { Observable } from 'rxjs';

import { Component, Input, OnInit } from '@angular/core';

import { Statistics } from '../statistics.model';

@Component({
  selector: 'app-statistics-table',
  templateUrl: './statistics-table.component.html',
  styleUrls: ['./statistics-table.component.scss']
})
export class StatisticsTableComponent implements OnInit {
  public displayedColumns: string[];
  @Input() statistics$: Observable<Statistics>;

  constructor() {
    this.displayedColumns = [
      'range',
      'status',
      'type',
      'start',
      'checked',
      'covered',
      'inspected',
      'dried',
    ];
  }

  ngOnInit(): void {
  }

}
