import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [ 
  ],
  
  providers: [ConfirmationService],
  imports: [
    CommonModule,
  ],
  exports : [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class CalendarModule { }
