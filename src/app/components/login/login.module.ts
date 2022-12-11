import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { DialogModule } from 'primeng/dialog';
import {PasswordModule} from 'primeng/password';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DialogModule,
    PasswordModule
  ]
})
export class LoginModule { }
