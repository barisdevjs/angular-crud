import { HttpClient, HttpHandler, HttpHeaders, HttpRequest, HttpInterceptor} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../types/employee-type';
import { Observable } from 'rxjs'

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authReq = req.clone({
        setHeaders: {
            'Cache-Control': 'no-cache',
             Pragma: 'no-cache'
        }
    });
    return next.handle(authReq);    
  }

  
  constructor(private http: HttpClient) { }

  getCustomersLarge() : Observable<Customer[]> {
      return this.http.get<Customer[]>('assets/customers-large.json', httpOptions)
  }
}
