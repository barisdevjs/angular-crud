import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { SignUser } from '../types/user-type';

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json'
  })
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
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  private apiUrl = 'http://localhost:5000/signUpUser'

  getUsers(): Observable<SignUser[]> {
    return this.http.get<SignUser[]>(this.apiUrl, httpOptions)
  }

  signUser(user: SignUser): Observable<SignUser> {
    return this.http.post<SignUser>(this.apiUrl, user, httpOptions)
  }
  

}
