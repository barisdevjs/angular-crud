import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { SignUser } from '../../types/user-type';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    signUpForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    mail: ['', Validators.required],
    password1: ['', Validators.required],
    password2: ['', Validators.required]
  })
  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private http: HttpClient,
    public userService: UserService
    ) { }

  stateOptions: any[] = [];
  value1: string = "off";
  uploadedFiles: any[] = [];
  fileToUpload: any;
  imageUrl: string = ''
  userList : SignUser[] = [];


  // path can be removed
  ngOnInit(): void {
    this.stateOptions = [{ label: 'SIGN UP', value: 'off', path:'/signup' },
                         { label: 'LOGIN', value: 'on', path:'/login' }];

    this.userService.getUsers().subscribe({
      next: (users) => { this.userList = users;},
      error: (error) => console.log(error),
      complete: () => alert('Success')
    })
  }

/*   addUser() {
    this.http.post<SignUser>("http://localhost:5000/signUpUser", this.signUpForm.value)
    .subscribe({
      next : (data: SignUser) => {
        alert('success');
        this.signUpForm.reset();
        this.router.navigate(['/login'])
      },
      error: (error: any) => console.log('Something went wrong', error),
      complete: () => console.info('Completed')
      // add message services
    })
  } */

/*   this.employeeService.addEmployee(this.employee).subscribe(data => (
    this.employees.push(data)
  ))
 */
  addUser(user: SignUser) {
    user = this.signUpForm.value
    this.userService.signUser(user).subscribe({
      next : (data: SignUser) => {
        this.userList.push(data);
      },
      error: (error: any) => console.log('Something went wrong')
    })
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }


  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

  }

  onBasicUploadAuto(event: any) {
    console.log(event)
  }

  handleRoute() {
    this.router.navigate(['/login'])
  }
}
