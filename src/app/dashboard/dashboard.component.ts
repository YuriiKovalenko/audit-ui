import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { subHours } from 'date-fns';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public timeRangeChange: BehaviorSubject<[Date, Date]>;

  constructor() { }

  ngOnInit(): void {
    const now = new Date();
    this.timeRangeChange = new BehaviorSubject([subHours(now, 24), now]);
  }

}
