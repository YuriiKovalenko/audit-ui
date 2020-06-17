import { Observable, Subject, Subscription, timer } from 'rxjs';
import { delay, map, pluck, switchMap, tap } from 'rxjs/operators';

import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-scheme',
  templateUrl: './scheme.component.html',
  styleUrls: ['./scheme.component.scss'],
})
export class SchemeComponent implements OnInit, OnDestroy {
  public states: {
    fillFailed: number;
    inspectFailed: number;
    readyFailed: number;
  };
  private stateChangeSubscription: Subscription;
  @Input() stateChange: Observable<{ property: string; value: number }>;

  constructor() {
    this.states = { fillFailed: null, inspectFailed: null, readyFailed: null };
  }

  ngOnInit(): void {
    this.stateChangeSubscription = this.stateChange
      .pipe(
        tap((change) => {
          for (const key of Object.keys(this.states)) {
            this.states[key] = null;
          }
          this.states[change.property] = change.value;
        }),
        pluck('property'),
        switchMap((property) =>
          timer(3000).pipe(tap(() => (this.states[property] = null)))
        )
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.stateChangeSubscription.unsubscribe();
  }

  private getTimer(property: string) {
    return new Subject().pipe(
      switchMap(() =>
        timer(3000).pipe(tap(() => (this.states[property] = null)))
      )
    );
  }
}
