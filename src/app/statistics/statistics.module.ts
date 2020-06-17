import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NGX_MAT_NATIVE_DATE_FORMATS, NgxMatDateFormats } from '@angular-material-components/datetime-picker';

import { StatisticsTableComponent } from './statistics-table/statistics-table.component';
import { StatisticsComponent } from './statistics.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DatetimeSelectorComponent } from './datetime-selector/datetime-selector.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SchemeComponent } from './scheme/scheme.component';
import { StatisticsTableDetailedComponent } from './statistics-table-detailed/statistics-table-detailed.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [
    StatisticsComponent,
    StatisticsTableComponent,
    DatetimeSelectorComponent,
    SchemeComponent,
    StatisticsTableDetailedComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatButtonModule,
    MatDialogModule,
  ],
  entryComponents: [StatisticsTableDetailedComponent],
  providers: [ {provide: MAT_DATE_LOCALE, useValue: 'uk-UA'} ]
})
export class StatisticsModule {}
