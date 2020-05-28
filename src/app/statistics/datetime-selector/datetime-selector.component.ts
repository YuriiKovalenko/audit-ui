import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-datetime-selector',
  templateUrl: './datetime-selector.component.html',
  styleUrls: ['./datetime-selector.component.scss']
})
export class DatetimeSelectorComponent implements OnInit {
  @Input() timeRange: BehaviorSubject<[Date, Date]>;

  constructor() { }

  ngOnInit(): void {
  }

  public setTimeRange() {
    const range: [Date, Date] = [new Date(), new Date()];
    this.timeRange.next(range);
  }
}
