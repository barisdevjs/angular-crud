import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router'
import { LogUser } from './types/user-type';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router) {}

  title = 'angular-crud';
  loading: boolean = false;
  items: MenuItem[] = [];
  activeItem: MenuItem = {};
  routes : string[] = ['home', 'calendar', 'edit', 'documentation', 'settings'];
  imageUrl : string = '../../assets/111.jpg'


  ngOnInit(): void {

        this.items = [
          { label: 'Home', icon: 'pi pi-fw pi-home', routerLink:'home'},
          { label: 'Calendar', icon: 'pi pi-fw pi-calendar', routerLink :'calendar'},
          { label: 'Profile', icon: 'pi pi-fw pi-pencil' , routerLink: 'profile'},
          { label: 'Documentation', icon: 'pi pi-fw pi-file', routerLink: 'documentation'},
          { label: 'Settings', icon: 'pi pi-fw pi-cog' , routerLink: 'settings'}
        ];
        this.activeItem = this.items[1]
        this.displayUser()
  }

  activateMenu( activeItem : MenuItem){
    this.activeItem = activeItem;
    return this.activeItem;
 }

 displayUser( ) : void {
  // console.log(this.router)
 }

}
