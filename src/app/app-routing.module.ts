import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [ 
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login',  component : LoginComponent },
    { path: 'signup',  component : SignupComponent },
    { path: 'home',  component : DashboardComponent },
    { path: 'calendar', component : CalendarComponent },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
