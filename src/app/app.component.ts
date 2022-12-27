import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { MenuItem } from 'primeng/api';
import { StorageService } from './services/storage.service';
import { UserService } from './services/user.service';
import { LogUser, SignUser } from './types/user-type';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private userService: UserService,
    private ss: StorageService,
  ) { }

  title = 'angular-crud';
  loading: boolean = false;
  items: MenuItem[] = [];
  activeItem: MenuItem = {};
  routes: string[] = ['home', 'calendar', 'edit', 'documentation', 'settings'];
  imageUrl: string = '../../assets/111.jpg'
  isLoggedIn: boolean = false;
  chipName: string = '';
  res: any;
    
  currentUser : SignUser= {};

   ngOnInit() {
    this.isLoggedIn = this.ss.isLoggedIn()
    if (this.isLoggedIn){ 
      this.currentUser = this.ss.getUser();
      console.log(this.currentUser);
      this.imageUrl = this.currentUser.file as string;
      this.chipName = this.currentUser.firstName + ' ' + this.currentUser.lastName;
    }
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: 'home' },
      { label: 'Calendar', icon: 'pi pi-fw pi-calendar', routerLink: 'calendar' },
      { label: 'Profile', icon: 'pi pi-fw pi-pencil', routerLink: 'profile' },
      { label: 'Documentation', icon: 'pi pi-fw pi-file', routerLink: 'documentation' },
      { label: 'Settings', icon: 'pi pi-fw pi-cog', routerLink: 'settings' }
    ];
    this.activeItem = this.items[1]
/*     await this.ss.getUser().subscribe({
      next: (data:any) => {
        console.log(data);
        this.imageUrl = data.file as string;
        this.chipName = data.firstName + ' ' + data.lastName;
        this.isLoggedIn = data.isLogged as boolean;
      },
      error: (error :any) => { console.log(error); }
    }) */
  }



  activateMenu(activeItem: MenuItem) {
    this.activeItem = activeItem;
    return this.activeItem;
  }

  // get users from db
  homeLogOut() {
    this.currentUser = {... this.currentUser}
    this.currentUser.isLogged = false;
    console.log(this.currentUser)
    this.userService.editUser(this.currentUser).subscribe({
      next: (data) => {
        data = this.currentUser
        this.ss.saveUser(data);
      }
    });
  }

}


