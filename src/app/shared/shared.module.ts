import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatetimeSelectorComponent } from './datetime-selector/datetime-selector.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [DatetimeSelectorComponent],
  exports: [DatetimeSelectorComponent],
  imports: [
    CommonModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ {provide: MAT_DATE_LOCALE, useValue: 'uk-UA'} ]
})
export class SharedModule { }
