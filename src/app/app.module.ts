import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeService } from './services/employee.service';
import { UploadService } from './services/upload.service';


import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TabMenuModule } from 'primeng/tabmenu';
import { MessagesModule } from 'primeng/messages';
import { BadgeModule } from 'primeng/badge';




@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    InputNumberModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    RadioButtonModule,
    ConfirmDialogModule,
    FormsModule,
    TabMenuModule,
    FileUploadModule,
    RatingModule,
    ToolbarModule,
    InputTextareaModule,
    MessagesModule,
    BadgeModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent },
    ])

  ],
  providers: [MessageService, ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EmployeeService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UploadService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
