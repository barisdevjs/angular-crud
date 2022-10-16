import { HttpClient, HttpHandler, HttpHeaders, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { MessageService, ConfirmationService} from 'primeng/api';

// use this Edit Component and compare the files with employee.service 

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UploadService implements HttpInterceptor{

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authReq = req.clone({
        setHeaders: {
            'Cache-Control': 'no-cache, no-store, must-revalidate', ///
            Pragma: 'no-cache'
        }
    });
    return next.handle(authReq);
}
  public apiUrl = 'http://localhost:5000/uploads' 


  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  uploadFile(file : any) : Observable<any> {
    const url = `${this.apiUrl}/${file.id}`;
    return this.http.post(url,file, httpOptions)
  }

  
}


