import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SchemeComponent } from './scheme/scheme.component';
import { StatisticsTableDetailedComponent } from './statistics-table-detailed/statistics-table-detailed.component';
import { StatisticsTableComponent } from './statistics-table/statistics-table.component';
import { StatisticsComponent } from './statistics.component';
import { MatDividerModule } from '@angular/material/divider';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    StatisticsComponent,
    StatisticsTableComponent,
    SchemeComponent,
    StatisticsTableDetailedComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    HttpClientModule,
    FormsModule,
    MatSidenavModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    MatDividerModule,
    MatSelectModule,
    SharedModule,
  ],
  entryComponents: [StatisticsTableDetailedComponent],
})
export class StatisticsModule {}
