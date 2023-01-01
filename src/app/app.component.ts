import { Component,  OnInit} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router'
import { MenuItem, MessageService } from 'primeng/api';
import { StorageService } from './services/storage.service';
import { UserService } from './services/user.service';
import { SignUser } from './types/user-type';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private userService: UserService,
    private ss: StorageService,
    private ms: MessageService,
    private router: Router,
  ) {

    router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.url = val.url.split('/')[1]
      }
    });
  }

  title = 'angular-crud';
  loading: boolean = false;
  items: MenuItem[] = [];
  activeItem: MenuItem = {};
  routes: string[] = ['home', 'calendar', 'edit', 'documentation', 'settings'];
  imageUrl: string = '../../assets/111.jpg'
  isLoggedIn: boolean = false;
  chipName: string = '';
  url: string = '';

  currentUser: SignUser = {};


  async ngOnInit() {

    // first time to login and get the data
    await this.ss.getUser().subscribe((data : SignUser)=> {
      this.currentUser = data;
      this.isLoggedIn = data.isLogged as boolean;
      this.chipName = this.currentUser.firstName + ' ' + this.currentUser.lastName
      this.imageUrl = this.currentUser.file as string;
    })


    // replication for refresh
    if ( this.ss.isLoggedIn())
    this.currentUser = JSON.parse(window.sessionStorage.getItem('auth-user') as string);
    this.chipName = this.currentUser.firstName + ' ' + this.currentUser.lastName
    this.imageUrl = this.currentUser.file as string;
    this.isLoggedIn = this.currentUser.isLogged as boolean;


    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: 'home' },
      { label: 'Calendar', icon: 'pi pi-fw pi-calendar', routerLink: 'calendar' },
      { label: 'Profile', icon: 'pi pi-fw pi-pencil', routerLink: 'profile' },
      { label: 'Documentation', icon: 'pi pi-fw pi-file', routerLink: 'documentation' },
      { label: 'Settings', icon: 'pi pi-fw pi-cog', routerLink: 'settings' }
    ];
    this.activeItem = this.items[1]
  }



  activateMenu(activeItem: MenuItem) {
    this.activeItem = activeItem;
    return this.activeItem;
  }

  // get users from db
  homeLogOut() {
    this.currentUser = { ... this.currentUser }
    this.currentUser.isLogged = false;
    this.imageUrl = '../../assets/111.jpg'
    this.chipName = '';
    this.url = '';
    this.userService.editUser(this.currentUser).subscribe({
      next: (data : SignUser) => {
        data = this.currentUser
        this.ss.removeOnLogOut();
      }
    });

    this.ms.add({ severity: 'info', summary: `Bye ${this.currentUser.firstName}  🤢`, life: 3500 })
    setTimeout(async () => {
      await this.router.navigate(['/login'])
    }, 3000)
  }


}


