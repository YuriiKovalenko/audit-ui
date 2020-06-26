import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Observable, Subscription } from 'rxjs';
import { DashboardService } from '../dashboard.service';
import { switchMap } from 'rxjs/operators';
import { Statistics } from 'src/app/statistics/statistics.model';

@Component({
  selector: 'app-covered-chart',
  templateUrl: './covered-chart.component.html',
  styleUrls: ['./covered-chart.component.scss'],
})
export class CoveredChartComponent implements OnInit, OnDestroy {
  public chartData: ChartDataSets[];
  public chartLabels: Label[];
  public chartOptions: ChartOptions;
  public chartType: ChartType;
  private timeRangeSub: Subscription;
  public loading: boolean;
  @Input() timeRange$: Observable<[Date, Date]>;

  constructor(private readonly dashboardService: DashboardService) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.timeRangeSub = this.timeRange$
      .pipe(
        switchMap(([start, end]) =>
          this.dashboardService.getCoveredChartData(start, end)
        )
      )
      .subscribe((data) => this.updateChart(data));
    this.chartOptions = {
      title: {
        text: 'Кількість закатаних банок',
        display: true,
        fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
        fontSize: 14,
      },
      responsive: true,
    };
  }

  ngOnDestroy() {
    this.timeRangeSub.unsubscribe();
  }

  private updateChart(data: Statistics[]) {
    this.chartLabels = data.map((stat) => stat.createdAt.getHours().toString());
    this.chartData = [{ data: data.map((stat) => stat.covered) }];
    this.loading = false;
  }
}
