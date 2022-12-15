import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { LogUser, SignUser } from '../../types/user-type';
import { ConfirmationService, MessageService } from 'primeng/api';

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
    private userService: UserService,
    private ms: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  stateOptions: any[] = [];
  value1: string = "off";
  uploadedFiles: any[] = [];
  fileToUpload: any;
  imageUrl: string = '';
  val3: string = '';
  userList: SignUser[] = [];



  ngOnInit() {
    this.stateOptions = [{ label: 'SIGN UP', value: 'on' }, { label: 'LOGIN', value: 'off' }];
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.userList = users;
        this.ms.add({ severity: 'info', summary: `Please continue`, life: 3000 })
      },
      error: (error) => {
        console.log(error);
        this.ms.add({ severity: 'error', summary: 'Can\'t be ready for now', detail: `${error.message}`, life: 4000 })
      },
    })
  }

   logUser() {
     this.userService.getUsers().subscribe({
      next: (data: SignUser[]) => {
        const user =  data.find((a: LogUser) => {
        return a.mail === this.logForm.value.mail  && a.password1 === this.logForm.value.password1;
      });
        if (!!user) {
          this.ms.add({ severity: 'success', summary: `Welcome ${user.firstName}  ❤ `, life: 3500 })
          setTimeout(() =>{
            this.logForm.reset();
            this.router.navigate(['/home'])
          },3500)
        } else {
          this.ms.add({ severity: 'error', summary: 'User not found ', life: 4000 })
        }
      },
      error: (error: any) => {
        console.log(error)
        this.ms.add({ severity: 'error', summary: 'Something went wrong', detail: `${error.message}`, life: 4000 })
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
