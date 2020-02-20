import { DxRangeSelectorModule } from 'devextreme-angular';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import { RangeSelectorComponent } from './range-selector/range-selector.component';
import { StatisticsTableComponent } from './statistics-table/statistics-table.component';
import { StatisticsComponent } from './statistics.component';
import { DxoLegendModule } from 'devextreme-angular/ui/nested';

@NgModule({
  declarations: [StatisticsComponent, RangeSelectorComponent, StatisticsTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    HttpClientModule,
    DxRangeSelectorModule,
    DxoLegendModule
  ]
})
export class StatisticsModule { }
