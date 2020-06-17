import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-datetime-selector',
  templateUrl: './datetime-selector.component.html',
  styleUrls: ['./datetime-selector.component.scss'],
})
export class DatetimeSelectorComponent implements OnInit {
  public form: FormGroup;
  @Input() timeRange: BehaviorSubject<[Date, Date]>;

  constructor() {
    this.form = new FormGroup({
      startDate: new FormControl(),
      endDate: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.timeRange.pipe(take(1)).subscribe(([startDate, endDate]) => {
      this.form.setValue({ startDate, endDate });
    });
    this.form.valueChanges.subscribe((value) => {
      this.setTimeRange(value.startDate, value.endDate);
    });
  }

  private setTimeRange(start: Date, end: Date) {
    this.timeRange.next([start, end]);
  }
}
