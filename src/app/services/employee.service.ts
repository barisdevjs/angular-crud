import { HttpClient, HttpHandler, HttpHeaders, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../types/employee-type';
import { Observable } from 'rxjs'
import { MessageService, ConfirmationService } from 'primeng/api';

const httpOptions = {
    headers: new HttpHeaders({
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
                'Cache-Control': 'no-cache, no-store, must-revalidate', 
                Pragma: 'no-cache'
            }
        });
        return next.handle(authReq);
    }

    public apiUrl = 'http://localhost:5000/employees'

    constructor(
        private http: HttpClient,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) { }

    getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(this.apiUrl, httpOptions)
    }

    deleteEmployee(employee: Employee): Observable<Employee> {
        const url = `${this.apiUrl}/${employee.id}`;
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: `${employee.name} deleted`, life: 3000 })
            }
        })
        return this.http.delete<Employee>(url);
    }

    deleteMultiple(id: string) {
        return this.http.delete(this.apiUrl + '/' + id)
    }

    editEmployee(employee: Employee): Observable<Employee> {
        const url = `${this.apiUrl}/${employee.id}`;
        return this.http.put<Employee>(url, employee, httpOptions);
    }

    addEmployee(employee: Employee): Observable<Employee> {
        return this.http.post<Employee>(this.apiUrl, employee, httpOptions)
    }

    getRandomImage() {
        return this.http.get('https://randomuser.me/api/?results=20', httpOptions)
    }

}
