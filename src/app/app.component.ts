import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router'
import { LogUser } from './types/user-type';
import { MenuItem } from 'primeng/api';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService,
    // private subs: Subscription,
    ) {}

  title = 'angular-crud';
  loading: boolean = false;
  items: MenuItem[] = [];
  activeItem: MenuItem = {};
  routes : string[] = ['home', 'calendar', 'edit', 'documentation', 'settings'];
  imageUrl : string = '../../assets/111.jpg'
  isLoggedIn : boolean = false;


  ngOnInit(): void {

        this.items = [
          { label: 'Home', icon: 'pi pi-fw pi-home', routerLink:'home'},
          { label: 'Calendar', icon: 'pi pi-fw pi-calendar', routerLink :'calendar'},
          { label: 'Profile', icon: 'pi pi-fw pi-pencil' , routerLink: 'profile'},
          { label: 'Documentation', icon: 'pi pi-fw pi-file', routerLink: 'documentation'},
          { label: 'Settings', icon: 'pi pi-fw pi-cog' , routerLink: 'settings'}
        ];
        this.activeItem = this.items[1]
        this.userService.getLogStatus().subscribe(val => this.isLoggedIn=val);

  }



  activateMenu( activeItem : MenuItem){
    this.activeItem = activeItem;
    return this.activeItem;
 }


}
