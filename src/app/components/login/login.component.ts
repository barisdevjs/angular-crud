import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logForm = this.fb.group({
    mail: ['', Validators.required],
    password1: ['', Validators.required],
  })
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
    ) { }

  stateOptions: any[] = [];
  value1: string = "off";
  uploadedFiles: any[] = [];
  fileToUpload: any;
  imageUrl: string = ''
  val3 :string = ''


  ngOnInit(): void {
    this.stateOptions = [{ label: 'SIGN UP', value: 'on' }, { label: 'LOGIN', value: 'off' }];
  }

  logUser() {
    console.log(this.logForm.value)
    console.log(this.logForm.value)
    this.http.get<any>("http://localhost:5000/signUpUser")
    .subscribe({
      next: (data: any) => {
        const user = data.find((a:any) => {
          return a.mail === this.logForm.value.mail && a.password1 === this.logForm.value.password1
        });
        if (user) {
          alert('User successfully logged in');
          this.logForm.reset();
          this.router.navigate(['/home'])
        } else {
          alert('User not found ');
        }    
      },
      error: (error: any) =>{
        console.log(error)
        alert('Something went wrong')
      }
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
    this.router.navigate(['/signup'])
  }
}













/*   bool = true;

  xx : string = 'SSSS'
  close() {
    return !this.bool;
  }

  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl('')
    })
  }); */
