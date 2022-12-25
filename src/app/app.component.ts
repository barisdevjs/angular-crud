import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router'
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
    ) {}

  title = 'angular-crud';
  loading: boolean = false;
  items: MenuItem[] = [];
  activeItem: MenuItem = {};
  routes : string[] = ['home', 'calendar', 'edit', 'documentation', 'settings'];
  imageUrl : string = '../../assets/111.jpg'
  isLoggedIn : boolean = false;
  chipName : string = '';
  res :any;

  ngOnInit(): void {

        this.items = [
          { label: 'Home', icon: 'pi pi-fw pi-home', routerLink:'home'},
          { label: 'Calendar', icon: 'pi pi-fw pi-calendar', routerLink :'calendar'},
          { label: 'Profile', icon: 'pi pi-fw pi-pencil' , routerLink: 'profile'},
          { label: 'Documentation', icon: 'pi pi-fw pi-file', routerLink: 'documentation'},
          { label: 'Settings', icon: 'pi pi-fw pi-cog' , routerLink: 'settings'}
        ];
        this.activeItem = this.items[1]
        this.userService.getA().subscribe({
          next:(data) => {
            console.log(data);
            this.imageUrl = data.file as string;
            this.chipName = data.firstName + ' ' + data.lastName;
            this.isLoggedIn = data.isLogged as boolean;
          },
          error: (error) => { console.log(error); }
        })
  }



  activateMenu( activeItem : MenuItem){
    this.activeItem = activeItem;
    return this.activeItem;
 }


}
