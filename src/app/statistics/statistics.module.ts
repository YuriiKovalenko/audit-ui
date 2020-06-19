import {
  NGX_MAT_NATIVE_DATE_FORMATS, NgxMatDateFormats, NgxMatDatetimePickerModule, NgxMatNativeDateModule
} from '@angular-material-components/datetime-picker';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';

import { DatetimeSelectorComponent } from './datetime-selector/datetime-selector.component';
import { SchemeComponent } from './scheme/scheme.component';
import {
  StatisticsTableDetailedComponent
} from './statistics-table-detailed/statistics-table-detailed.component';
import { StatisticsTableComponent } from './statistics-table/statistics-table.component';
import { StatisticsComponent } from './statistics.component';
import { MatDividerModule } from '@angular/material/divider';

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
    MatTooltipModule,
    MatDividerModule,
  ],
  entryComponents: [StatisticsTableDetailedComponent],
  providers: [ {provide: MAT_DATE_LOCALE, useValue: 'uk-UA'} ]
})
export class StatisticsModule {}
