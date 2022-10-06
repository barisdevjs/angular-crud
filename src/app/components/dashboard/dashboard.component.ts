import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "../../services/employee.service";
import { MessageService } from "primeng/api";
import { MenuItem } from 'primeng/api';
import { Employee } from 'src/app/types/employee-type';
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [MessageService]
})
export class DashboardComponent implements OnInit {

  /* Start of the main logic's variables */

  employeeDialog: boolean = false;
  employee: Employee = {}
/*   {
    id: 'sd',
    code: 'string',
    name: 'str',
    description: 'string',
    price: 2323,
    quantity: 323,
    inventoryStatus: 'string',
    category: 'string',
    image: 'string',
    rating: 222
  } */

  employees: Employee[] = [];
  selectedEmployees: Employee[] = [];
  submitted: boolean = false;


  statuses: any[] = []
  loading: boolean = false;
  activityValues: number[] = [0, 100]
  items: MenuItem[] = [];
  activeItem: MenuItem = {};

  constructor(private employeeService: EmployeeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    // move items to main app 
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home' },
      { label: 'Calendar', icon: 'pi pi-fw pi-calendar' },
      { label: 'Edit', icon: 'pi pi-fw pi-pencil' },
      { label: 'Documentation', icon: 'pi pi-fw pi-file' },
      { label: 'Settings', icon: 'pi pi-fw pi-cog' }
    ];

    this.activeItem = this.items[0];
    // ///////////////////////

    this.employeeService.getEmployees().subscribe(data => this.employees = data)
  }

  openNew() {
    this.employee = {};
    this.submitted = false;
    this.employeeDialog = true;
  }

  deleteSelectedEmployees(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.employees = this.employees.filter(e => !this.selectedEmployees.includes(e)); // e.id maybe
        this.selectedEmployees = [];
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employees Deleted', life: 3000 });
      }
    })
  }

  editEmployee(employee: Employee) {
    this.employee = { ...employee };
    this.employeeDialog = true;
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
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Employee Updated', life: 3000});
        }
        else {
            this.employee.id = this.createId();
            this.employee.image = 'employee-placeholder.svg';
            this.employees.push(this.employee);
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Employee Created', life: 3000});
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
