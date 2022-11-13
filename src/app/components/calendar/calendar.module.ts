import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';



@NgModule({
  declarations: [
    CalendarComponent
  ],
  imports: [
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class CalendarModule { }
