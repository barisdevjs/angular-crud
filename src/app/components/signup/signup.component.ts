import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    private http: HttpClient
    ) { }

  stateOptions: any[] = [];
  value1: string = "off";
  uploadedFiles: any[] = [];
  fileToUpload: any;
  imageUrl: string = ''


  // path can be removed
  ngOnInit(): void {
    this.stateOptions = [{ label: 'SIGN UP', value: 'off', path:'/signup' },
                         { label: 'LOGIN', value: 'on', path:'/login' }];
  }

  addUser() {
    console.log(this.signUpForm.value)
    this.http.post<any>("http://localhost:5000/signUpUser", this.signUpForm.value)
    .subscribe({
      next : (data: any) => {
        alert('success');
        this.signUpForm.reset();
        this.router.navigate(['/login'])
      },
      error: (error: any) => console.log('Something went wrong', error),
      complete: () => console.info('Completed')
      // add message services
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
