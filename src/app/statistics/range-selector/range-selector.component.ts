import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnDestroy
} from '@angular/core';

import { Statistics } from '../statistics.model';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-range-selector',
  templateUrl: './range-selector.component.html',
  styleUrls: ['./range-selector.component.scss']
})
export class RangeSelectorComponent
  implements OnInit, AfterViewInit, OnDestroy {
  private statisticsSubscription: Subscription;
  public startDate: Date;
  public endDate: Date;
  public statistics: Statistics[];
  @Input() statistics$: Observable<Statistics[]>;
  @Output() rangeChange: EventEmitter<[Date, Date]>;

  constructor() {
    this.rangeChange = new EventEmitter();
    const milisecondsInHour = 3600 * 1000;
    const currentTime = Date.now();
    this.startDate = new Date(currentTime - milisecondsInHour);
    this.endDate = new Date(currentTime + milisecondsInHour);
  }

  ngOnInit(): void {
    this.statisticsSubscription = this.statistics$.pipe(first()).subscribe({
      next: statistics => (this.statistics = statistics)
    });
  }

  ngAfterViewInit(): void {
    this.rangeChange.emit([this.startDate, this.endDate]);
  }

  ngOnDestroy(): void {
    this.statisticsSubscription.unsubscribe();
  }

  public onRangeChange(event: any) {
    this.rangeChange.emit(event.value);
  }
}
