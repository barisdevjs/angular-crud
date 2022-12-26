import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
    private ss:StorageService,
    ) {}

  canActivate() {
    if (this.ss.getUser()) return true;
    else this.router.navigate(['/login']) 
    return false;
  }

}
