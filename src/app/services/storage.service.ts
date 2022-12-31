import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

  public getUser(): Observable<SignUser> {
     return this.subUser$.asObservable();
  }

  public removeOnLogOut() : void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.clear();
    this.subUser$.next({});
  }

  public  isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) return true;
    return false;
  }
}