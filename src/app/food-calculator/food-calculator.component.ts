import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, of, Subscription, combineLatest } from 'rxjs';
import { subHours } from 'date-fns';
import { StatisticsService } from '../statistics/statistics.service';
import { switchMap, pluck, catchError } from 'rxjs/operators';

type FoodItem = { name: string; weight: number };
@Component({
  selector: 'app-food-calculator',
  templateUrl: './food-calculator.component.html',
  styleUrls: ['./food-calculator.component.scss'],
})
export class FoodCalculatorComponent implements OnInit, OnDestroy {
  public timeRangeChange: BehaviorSubject<[Date, Date]>;
  public foodItems: FoodItem[];
  public calculatedFoodItems: FoodItem[];
  public foodName: string;
  public foodWeight: number;
  public coveredAmount: number;
  public calcSub: Subscription;

  constructor(private readonly statisticsService: StatisticsService) {
    this.foodItems = [];
  }

  ngOnInit(): void {
    const now = new Date();
    const range: [Date, Date] = [subHours(now, 12), now];
    this.timeRangeChange = new BehaviorSubject(range);
    this.calcSub = this.timeRangeChange
      .asObservable()
      .pipe(
        switchMap(([startDate, endDate]) =>
          this.statisticsService.getSummary(startDate, endDate)
        ),
        pluck('covered'),
        catchError(() => of(this.coveredAmount))
      )
      .subscribe(covered => {
        this.coveredAmount = covered;
        this.updateCalculatedFoodItem();
      });
  }

  ngOnDestroy() {
    this.timeRangeChange.complete();
  }

  public addNewFoodItem() {
    this.foodItems.push({
      name: this.foodName,
      weight: this.foodWeight,
    });
    this.foodName = '';
    this.foodWeight = 0;
    this.updateCalculatedFoodItem();
  }

  public removeFoodItem(index: number) {
    this.foodItems = this.foodItems.filter((_, i) => i !== index);
    this.updateCalculatedFoodItem();
  }

  public updateCalculatedFoodItem() {
    this.calculatedFoodItems = this.foodItems.map((item) => ({
      ...item,
      weight: item.weight * this.coveredAmount,
    }));
  }
}
