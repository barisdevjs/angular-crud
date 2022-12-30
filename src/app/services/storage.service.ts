import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

  private subUser$ = new BehaviorSubject<SignUser>({});

  public saveUser(user: SignUser) :void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    this.subUser$.next(user);
  }

  public getUser(): SignUser {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      this.subUser$.asObservable()
      return JSON.parse(user)};
    return {};
  }

  public removeOnLogOut() : void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.clear();
  }

  public  isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) return true;
    return false;
  }
}