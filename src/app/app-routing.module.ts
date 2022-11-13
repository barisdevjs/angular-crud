import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [ 
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home',  component :DashboardComponent },
    { path: 'calendar', component : CalendarComponent},
  { path: '**', redirectTo: 'home', pathMatch: 'full', }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
