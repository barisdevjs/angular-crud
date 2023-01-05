import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { MessageService } from 'primeng/api';
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private ss:StorageService,
    public ms:MessageService,
    ) {}

   canActivate() {
     let flag:boolean = false;
     flag =  this.ss.isLoggedIn()
     if ( flag === false ) 
     this.ms.add({ severity: 'warn', summary: `Route is protected by guard  🔑`, life: 1500 })
     this.ms.add({ severity: 'error', summary: `You are not logged in`, life: 2500 })
     this.router.navigate(['/login']) 
     return flag
  }

}
