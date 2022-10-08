import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [ 
    {path: '', component : AppComponent },
    { path: 'home',  component :DashboardComponent },
    { path: 'calendar', component : CalendarComponent},
  { path: '**', redirectTo: 'home', pathMatch: 'full', }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
