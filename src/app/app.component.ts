import { Component, OnInit} from '@angular/core';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'angular-crud';
  loading: boolean = false;
  activityValues: number[] = [0, 100]
  items: MenuItem[] = [];
  activeItem: MenuItem = {};
  routes : string[] = ['home', 'calendar', 'edit', 'documentation', 'settings'];
  


  ngOnInit(): void {

        this.items = [
          { label: 'Home', icon: 'pi pi-fw pi-home', routerLink:'home'},
          { label: 'Calendar', icon: 'pi pi-fw pi-calendar', routerLink :'calendar'},
          { label: 'Edit', icon: 'pi pi-fw pi-pencil' , routerLink: 'edit'},
          { label: 'Documentation', icon: 'pi pi-fw pi-file', routerLink: 'documentation'},
          { label: 'Settings', icon: 'pi pi-fw pi-cog' , routerLink: 'settings'}
        ];
        this.activeItem = this.items[1]
  }

  activateMenu( activeItem : MenuItem){
    this.activeItem = activeItem;
    console.log(activeItem)
    return this.activeItem;
 }

}
