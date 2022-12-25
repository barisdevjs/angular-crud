import { HttpClient, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject,map } from 'rxjs';
import { SignUser } from '../types/user-type';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  withCredentials: true
}

@Injectable({
  providedIn: 'root'
})
export class UserService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authReq = req.clone({
      setHeaders: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache'
      }
    });
    return next.handle(authReq);
  }

  constructor(
    private http: HttpClient,
  ) { }

  private apiUrl = 'http://localhost:5000/signUpUser'
  public a = new BehaviorSubject<SignUser>({})
  private subject = new BehaviorSubject<any>(true); // change to the null
 
  getUsers(): Observable<SignUser[]> {
    return this.http.get<SignUser[]>(this.apiUrl, httpOptions)
  }

  signUser(user: SignUser): Observable<SignUser> {
    return this.http.post<SignUser>(this.apiUrl, user, httpOptions)
  }

  editUser(user: SignUser): Observable<SignUser> {
    const url = `${this.apiUrl}/${user.id}`;
    return this.http.put<SignUser>(url, user, httpOptions);
  }

  sendLogStatus(status: boolean) {
    this.subject.next(status); //all subscribers get the new value
  }

  getLogStatus() {
    return this.subject.asObservable();
  }

  sendA(user: SignUser): Observable<SignUser> {
    this.a.next(user)
    return this.http.get<SignUser>(this.apiUrl, httpOptions)
  }

  getA(){
    return this.a.asObservable()
  }

  get uValue() : SignUser {
    return this.a.value
  }

  isLogged() {
    let a : boolean = false;
     this.getA().subscribe({
      next: (res) => {
        a = res.isLogged as boolean;
      }
    })
    return a
  }


}
