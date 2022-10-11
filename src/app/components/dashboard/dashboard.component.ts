import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "../../services/employee.service";
import { MessageService, ConfirmationService } from "primeng/api";
import { Employee } from 'src/app/types/employee-type';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  employeeDialog: boolean = false;
  employee: Employee = {}
  employees: Employee[] = [];
  selectedEmployees: Employee[] = [];
  submitted: boolean = false;
  // statuses: any[] = []

  constructor(
    public employeeService: EmployeeService,
    public messageService: MessageService,
    public confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(data => this.employees = data)
  }

  openNew() {
    this.employee = {};
    this.submitted = false;
    this.employeeDialog = true;
  }

   deleteSelectedEmployees() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
       accept:  () => {
        const willDeleted =  this.selectedEmployees
        willDeleted.forEach( e =>  this.deleteEmployee(e))
        this.selectedEmployees = [];
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employees Deleted', life: 3000 });
      }
    })
  }

   editEmployee(employee: Employee) {
    this.employee = { ...employee };
    this.employeeDialog = true;
    this.employeeService.editEmployee(employee).subscribe(data => data = this.employee)
  }

   deleteEmployee(employee: Employee) {
    // we may use the Event emitter if we need that info smwhere in the app ( parent of this one )

    this.employeeService.deleteEmployee(employee).subscribe(() => {
      this.employees = this.employees.filter(val => val.id !== employee.id);
    })
    this.messageService.add({ severity: 'warning', summary: 'Successful', detail: `${employee.name} is successfully deleted`, life: 3000 });

  }

  hideDialog() {
    this.employeeDialog = false;
    this.submitted = false;
  }

  saveEmployee() {
    this.submitted = true;

    if (this?.employee?.name?.trim()) {
      if (this.employee.id) {
        this.employees[this.findIndexById(this.employee.id)] = this.employee;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Updated', life: 3000 });
      }
      else {
        this.employee.id = this.createId();
        // this.employees.push(this.employee);
        this.employeeService.addEmployee(this.employee).subscribe(data => (
          this.employees.push(data)
        ))
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Created', life: 3000 });
      }

      this.employees = [...this.employees];
      this.employeeDialog = false;
      this.employee = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.employees.length; i++) {
      if (this.employees[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}
