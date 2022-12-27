import { Injectable } from '@angular/core';
import { SignUser } from '../types/user-type';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: SignUser): SignUser {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    return user
  }

  public getUser(): SignUser {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) return JSON.parse(user);
    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) true;
    return false;
  }
}