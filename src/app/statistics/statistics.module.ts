import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import { StatisticsTableComponent } from './statistics-table/statistics-table.component';
import { StatisticsComponent } from './statistics.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DatetimeSelectorComponent } from './datetime-selector/datetime-selector.component';

@NgModule({
  declarations: [StatisticsComponent, StatisticsTableComponent, DatetimeSelectorComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    HttpClientModule,
  ]
})
export class StatisticsModule { }
