import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from "../../services/employee.service";
import { MessageService, ConfirmationService } from "primeng/api";
import { Employee } from 'src/app/types/employee-type';
import { statusArr, userImages } from "../../../assets/variables";
import { UploadService } from "../../services/upload.service";
import { ExportExcelService } from '../../services/export-excel.service';
import { NgxCaptureService } from 'ngx-capture';
import { saveAs } from 'file-saver';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('screen', { static: true }) screen: any;
  @ViewChild('contactForm') formMine!: NgForm;

  employeeDialog: boolean = false;
  employee: Employee = {}
  employees: Employee[] = [];
  selectedEmployees: Employee[] = [];
  submitted: boolean = false;
  statuses = statusArr
  uploadedFiles: object[] = userImages
  dataForExcel: Employee[] = [];
  imgBase64: any = '';
  form: string = '';
  ratingRangeFlag: boolean = true;

  validate = new FormGroup({
    XXX: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(6)])
  })

  constructor(
    public employeeService: EmployeeService,
    public messageService: MessageService,
    public confirmationService: ConfirmationService,
    public uploadService: UploadService,
    public ete: ExportExcelService,
    private captureService: NgxCaptureService,
  ) { }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(data => this.employees = data);
    this.getImg();
    setTimeout(() => {
      this.saveScreen()
    }, 2500)
  }

  onSubmit() { console.log(this.formMine) }

  getImg() {
    this.employeeService.getRandomImage().subscribe((response: any) => {
      this.uploadedFiles = response.results.map((e: any) => e.picture.thumbnail)
    })
  }

  openNew() {
    this.employee = {};
    this.submitted = false;
    this.employeeDialog = true;
  }

  fileSelected(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      this.uploadService.uploadFile(file)
    }
    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: `${this.uploadedFiles} uploaded` });
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
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: `Employees deleted `, life: 3000 });
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Terminated', life: 1000 })
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

  editEmployeeStatus( employee: Employee) {
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

  validateRange(num: number): boolean {
    this.employee.rating = num;
    return num > 5 || num < 1 ? this.ratingRangeFlag === true : false
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

  randomImg(): string {
    const el = this.uploadedFiles[Math.floor(Math.random() * this.uploadedFiles.length) + 1]
    return Object.values(el).join('')
  }

  exportToExcel() {
    this.employees.forEach((employee: Employee) => {
      this.dataForExcel.push(employee as Employee);
    });


    const d = new Date();
    const date = d.getMonth() + '-' + d.getFullYear();
    const reportData = {
      title: `Employee Status - ${date}`,
      data: this.dataForExcel,
      headers: Object.keys(this.employees[0]).map(e => e[0].toUpperCase() + e.slice(1)),
      img: this.imgBase64
    };

    this.ete.exportExcel(reportData);
  }

  saveScreen() {
    this.captureService.getImage(this.screen.nativeElement, true)
      .subscribe((img: any) => {
        this.imgBase64 = img
      })
  }

  // base 64 to image and download image

  DataURIToBlob(dataURI: string = this.imgBase64, name: string) {
    saveAs(dataURI, name + '.png')
  }

  checkInput(event: any) {
    const inputVal = event.target;
    const inputData = JSON.parse(inputVal.dataset.ranges);
    let color = "";
  
    for (let i = 0; i < inputData.length; i++) {
      if (inputVal.value === inputData[i][0]) {
        color = inputData[i][1];
        break;
      }
    }
    inputVal.style.backgroundColor = color;
  }
}