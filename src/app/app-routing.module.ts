import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [ 
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login',  component : LoginComponent }, 
    { path: 'signup',  component : SignupComponent },
    { path: 'home',  component : DashboardComponent, canActivate:[AuthGuard] },
    { path: 'profile',  component : ProfileComponent,  canActivate:[AuthGuard] },
    { path: 'calendar', component : CalendarComponent,  canActivate:[AuthGuard] },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
