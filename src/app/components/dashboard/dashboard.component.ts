import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "../../services/employee.service";
import { MessageService, ConfirmationService } from "primeng/api";
import { Employee } from 'src/app/types/employee-type';
import { statusArr, userImages } from "../../../assets/variables";
import { UploadService }  from "../../services/upload.service";


/*  const imgArr: object[] = [
  { img:"https://randomuser.me/api/portraits/thumb/men/3.jpg"},
  { img:"https://randomuser.me/api/portraits/thumb/women/59.jpg"},
  { img:"https://randomuser.me/api/portraits/thumb/men/16.jpg"},
  { img:"https://randomuser.me/api/portraits/thumb/men/25.jpg"},
  { img:"https://randomuser.me/api/portraits/thumb/women/40.jpg"},
  { img:"https://randomuser.me/api/portraits/thumb/women/65.jpg"},
  { img:"https://randomuser.me/api/portraits/thumb/men/12.jpg"},
  { img:"https://randomuser.me/api/portraits/thumb/men/45.jpg"},
  { img:"https://randomuser.me/api/portraits/thumb/men/34.jpg"},
  { img:"https://randomuser.me/api/portraits/thumb/women/62.jpg"},
  { img:"https://randomuser.me/api/portraits/thumb/men/22.jpg"},
  { img:"https://randomuser.me/api/portraits/thumb/men/63.jpg"},
  { img:"https://randomuser.me/api/portraits/thumb/women/86.jpg"},
  { img:"https://randomuser.me/api/portraits/thumb/men/24.jpg"},
  { img:"https://randomuser.me/api/portraits/thumb/women/16.jpg"},
  { img:"https://randomuser.me/api/portraits/thumb/women/6.jpg"},
  { img:"https://randomuser.me/api/portraits/thumb/women/52.jpg"},
  { img:"https://randomuser.me/api/portraits/thumb/women/95.jpg"},
  { img:"https://randomuser.me/api/portraits/thumb/women/45.jpg"},
  { img:"https://randomuser.me/api/portraits/thumb/men/73.jpg"}
] */


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
  statuses = statusArr
  uploadedFiles : object[] = [
    { img:"https://randomuser.me/api/portraits/thumb/men/3.jpg"},
    { img:"https://randomuser.me/api/portraits/thumb/women/59.jpg"},
    { img:"https://randomuser.me/api/portraits/thumb/men/16.jpg"},
    { img:"https://randomuser.me/api/portraits/thumb/men/25.jpg"},
    { img:"https://randomuser.me/api/portraits/thumb/women/40.jpg"},
    { img:"https://randomuser.me/api/portraits/thumb/women/65.jpg"},
    { img:"https://randomuser.me/api/portraits/thumb/men/12.jpg"},
    { img:"https://randomuser.me/api/portraits/thumb/men/45.jpg"},
    { img:"https://randomuser.me/api/portraits/thumb/men/34.jpg"},
    { img:"https://randomuser.me/api/portraits/thumb/women/62.jpg"},
    { img:"https://randomuser.me/api/portraits/thumb/men/22.jpg"},
    { img:"https://randomuser.me/api/portraits/thumb/men/63.jpg"},
    { img:"https://randomuser.me/api/portraits/thumb/women/86.jpg"},
    { img:"https://randomuser.me/api/portraits/thumb/men/24.jpg"},
    { img:"https://randomuser.me/api/portraits/thumb/women/16.jpg"},
    { img:"https://randomuser.me/api/portraits/thumb/women/6.jpg"},
    { img:"https://randomuser.me/api/portraits/thumb/women/52.jpg"},
    { img:"https://randomuser.me/api/portraits/thumb/women/95.jpg"},
    { img:"https://randomuser.me/api/portraits/thumb/women/45.jpg"},
    { img:"https://randomuser.me/api/portraits/thumb/men/73.jpg"}
  ]

  constructor(
    public employeeService: EmployeeService,
    public messageService: MessageService,
    public confirmationService: ConfirmationService,
    public uploadService: UploadService,
    ) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(data => this.employees = data)
    this.getImg()
  }

    getImg() {
      this.employeeService.getRandomImage().subscribe((response:any) => {
      this.uploadedFiles = response.results.map((e:any) => e.picture.thumbnail)
    })
  } 

  openNew() {
    this.employee = {};
    this.submitted = false;
    this.employeeDialog = true;
  }

  fileSelected(event :any) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
        this.uploadService.uploadFile(file)
    }
    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: `${this.uploadedFiles} uploaded`});
}

  deleteSelectedEmployees(employees: Employee[]) {
    employees = this.selectedEmployees
    this.confirmationService.confirm({
      message: `Delete <br> ${employees.map(e => e.name).join('<br>')} ? `,
      header: 'Confirm multi delete ?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        for (const employee in employees) {
          this.employeeService.deleteMultiple(employees[employee].id).subscribe(() => {
            this.employees = this.employees.filter(val => val.id !== employees[employee].id)
          }
          );
        }
        this.selectedEmployees = [];
        this.messageService.add({ severity: 'success', summary: 'Successful', detail:`Employees deleted `, life: 3000 });
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Terminated', life: 1000})
        this.selectedEmployees = [];
      }
    })
  }

  deleteEmployee(employee: Employee) {
    this.confirmationService.confirm({
      message: `Delete ${employee.name} ? `,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.employeeService.deleteEmployee(employee).subscribe(() => {
          this.employees = this.employees.filter(val => val.id !== employee.id)
        }
        );
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: `${employee.name} deleted`, life: 3000 });
      }
    })
  }

  editEmployee(employee: Employee) {
    this.employeeDialog = true;
    this.employee = { ...employee };
  }

  editEmployeeRating(employee: Employee) {
    this.employee = { ...employee };
    this.employeeService.editEmployee(employee).subscribe(data => data = this.employee)
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
        this.employee = { ...this.employee };
        this.employeeService.editEmployee(this.employee).subscribe(data => data = this.employee);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: `${this.employee.name} updated`, life: 3000 });
      }
      else {
        this.employee.id = this.createId();
        this.employee.image = this.randomImg()
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

  randomImg() : string {
   const el = this.uploadedFiles[Math.floor ( Math.random() * this.uploadedFiles.length) + 1]
   return Object.values(el)[0]
  }
}