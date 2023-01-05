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
    this.subUser$.next(user);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
     return this.subUser$.asObservable();
  }

  public removeOnLogOut() : void {
    window.sessionStorage.removeItem(USER_KEY);
    this.clean();
    this.subUser$.next({});
  }

  public  isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) return true;
    return false;
  }
}