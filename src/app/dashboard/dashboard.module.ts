import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { CoveredChartComponent } from './covered-chart/covered-chart.component';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DashboardComponent, CoveredChartComponent],
  imports: [CommonModule, ChartsModule, SharedModule],
})
export class DashboardModule {}
