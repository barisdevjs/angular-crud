import { HttpClient, HttpHandler, HttpHeaders, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../types/employee-type';
import { Observable, firstValueFrom } from 'rxjs'

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
                'Cache-Control': 'no-cache',
                Pragma: 'no-cache'
            }
        });
        return next.handle(authReq);
    }

    private apiUrl = 'http://localhost:5000/tasks' // replace it with sth reliable

    status: string[] = ['WORKING', 'ANNUAL-LEAVE', 'SICKNESS'];

    employeeNames: string[] = [
        "Bamboo Watch", 
        "Black Watch", 
        "Blue Band", 
        "Blue T-Shirt", 
        "Bracelet", 
        "Brown Purse", 
        "Chakra Bracelet",
        "Galaxy Earrings",
        "Game Controller",
        "Gaming Set",
        "Gold Phone Case",
        "Green Earbuds",
        "Green T-Shirt",
        "Grey T-Shirt",
        "Headphones",
        "Light Green T-Shirt",
        "Lime Band",
        "Mini Speakers",
        "Painted Phone Case",
        "Pink Band",
        "Pink Purse",
        "Purple Band",
        "Purple Gemstone Necklace",
        "Purple T-Shirt",
        "Shoes",
        "Sneakers",
        "Teal T-Shirt",
        "Yellow Earbuds",
        "Yoga Mat",
        "Yoga Set",
    ];


    constructor(private http: HttpClient) { }

    getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(this.apiUrl)
    }

    getProductsSmall() {
        return this.http.get<any>('assets/products-small.json')
            .toPromise()
            .then(res => <Employee[]>res.data)
            .then(data => { return data; });
    }

    getProducts() {
        return this.http.get<any>('assets/products.json')
            .toPromise()
            .then(res => <Employee[]>res.data)
            .then(data => { return data; });
    }

    getProductsWithOrdersSmall() {
        return this.http.get<any>('assets/products-orders-small.json')
            .toPromise()
            .then(res => <Employee[]>res.data)
            .then(data => { return data; });
    }

    generateProduct(): Employee {
        const employee: Employee = {
            id: this.generateId(),
            name: this.generateName(),
            description: "Employee Description",
            price: this.generatePrice(),
            quantity: this.generateQuantity(),
            category: "Employee Category",
            inventoryStatus: this.generateStatus(),
            rating: this.generateRating()
        };
        if ( employee.name) {
            employee.image = employee.name.toLocaleLowerCase().split(/[ ,]+/).join('-') + ".jpg";;
        }
        return employee;
    }

    generateId() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }

    generateName() {
        return this.employeeNames[Math.floor(Math.random() * Math.floor(30))]; // array of strings of names
    }

    generatePrice() {
        return Math.floor(Math.random() * Math.floor(2299) + 1);
    }

    generateQuantity() {
        return Math.floor(Math.random() * Math.floor(75) + 1);
    }

    generateStatus() {
        return this.status[Math.floor(Math.random() * Math.floor(3))];
    }

    generateRating() {
        return Math.floor(Math.random() * Math.floor(5) + 1);
    }


}
