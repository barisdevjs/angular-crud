import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmationService, MessageService } from 'primeng/api';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DialogModule,
    InputTextareaModule
  ],
  providers: [
    ConfirmationService, MessageService
  ]
})
export class DashboardModule { }
