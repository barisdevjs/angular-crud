import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private ss:StorageService,
    ) {}

   canActivate() {
     let flag:boolean = false;
     flag =  this.ss.isLoggedIn()
     if ( flag === false ) 
     this.router.navigate(['/login']) 
     return flag
  }

}
