import { HttpClient, HttpHandler, HttpHeaders, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../types/employee-type';
import { Observable, tap } from 'rxjs'
import { MessageService, ConfirmationService } from 'primeng/api';
import { firstNames, lastNames, statusArr, categoryArr } from '../../assets/variables'

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}

const imageHeaders = {
    headers : new HttpHeaders({
        'Accept': 'application/json', 'Content-Type': 'application/json', 
        'Access-Control-Allow-Headers' : 'https://randomuser.me/api/portraits'
    })
}

@Injectable({
    providedIn: 'root'
})
export class EmployeeService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authReq = req.clone({
            setHeaders: {
                'Cache-Control': 'no-cache, no-store, must-revalidate', ///
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

    deleteMultiple(id: any) {
        return this.http.delete(this.apiUrl + '/' + id)
    }

    editEmployee(employee: Employee): Observable<Employee> {
        const url = `${this.apiUrl}/${employee.id}`;
        return this.http.put<Employee>(url, employee, httpOptions);
    }

    addEmployee(employee: Employee): Observable<Employee> {
        return this.http.post<Employee>(this.apiUrl, employee, httpOptions)
    }


    generateProduct(): Employee {
        const employee: Employee = {
            id: this.generateId(),
            name: this.generateName(),
            wage: this.generateWage(),
            category: "Employee Category", // update here
            rating: this.generateRating(),
            status: this.generateStatus(),
            image: this.getRandomImage(),
        };

        return employee;
    }

    getRandomImage() {
        const baseImgUrl = 'https://randomuser.me/api/portraits'
        const numToStr = Math.floor(Math.random() * Math.floor(50) + 1).toString()
        const gender =  this.getRandomGenders()

        // return this.http.get(`${baseImgUrl}/${numToStr}/${gender}.jpg`)

        return this.http.get('https://randomuser.me/api/', httpOptions)
    }

    getRandomGenders(): string {
        return Math.random() >= 0.5 ? 'women' : 'men';
    }

    generateId(): string {
        return Math.floor(Math.random() * 100000).toString()
    }

    generateWage(): number {
        return Math.floor(Math.random() * Math.floor(2299) + 1);
    }

    generateStatus(): string {
        return statusArr[(Math.floor(Math.random() * Math.floor(statusArr.length)) + 1)]
    }

    generateRating(): number {
        return Math.floor(Math.random() * Math.floor(5) + 1);
    }

/*     generateImage() {
        return this.http.get<string>(`https://xsgames.co/randomusers/avatar.php?g=${this.getRandomGenders()}`, imageHeaders)
    } */

    generateName(): string {
        const first = firstNames[Math.floor(Math.random() * firstNames.length) + 1]
        const last = lastNames[Math.floor(Math.random() * lastNames.length) + 1]
        return first + '  ' + last
    }

    generateCategory(): Object {
        return statusArr[Math.floor(Math.random() * Math.floor(statusArr.length))];
    }

}
