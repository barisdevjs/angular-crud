import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { LogUser, SignUser } from '../../types/user-type';
import { MessageService } from 'primeng/api';
import { emailValidator } from 'src/app/directives/email-validator.directive';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logForm = this.fb.group({
    mail: ['', [Validators.required,emailValidator()]],
    password1: ['',[ Validators.required, Validators.minLength(3), Validators.maxLength(8), 
    ]]
  })

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private ms: MessageService,
    private ss: StorageService,
  ) { }

  stateOptions: any[] = [];
  value1: string = "off";
  uploadedFiles: any[] = [];
  fileToUpload: any;
  imageUrl: string = '';
  userList: SignUser[] = [];
  user : any = null
  isLoggedIn: boolean = false;
  userToken : string = '';



  ngOnInit() {

    if (this.ss.isLoggedIn()) this.isLoggedIn = true;

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
        this.user =  data.find((a: LogUser) => {
          return a.mail === this.logForm.value.mail  &&  a.password1 === this.logForm.value.password1;
        });
        
        if (!!this.user) {
          this.user = { ...this.user };
          this.user.isLogged = true;
          this.userService.editUser(this.user).subscribe({
            next: (data) => {
              data = this.user
              this.ss.saveUser(data);
            }
          });
          this.ms.add({ severity: 'success', summary: `Welcome ${this.user.firstName}  ❤ `, life: 3500 })
          setTimeout(() =>{
            this.logForm.reset();
            this.router.navigate(['/home'])
          },3000)
        } else {
          this.ms.add({ severity: 'error', summary: 'Password is incorrect', life: 4000 })
        }
      },
      error: (error: any) => {
        console.log(error)
        this.ms.add({ severity: 'error', summary: 'Something went wrong', detail: `${error.message}`, life: 4000 })
      }
    })
  }

  handleRoute() {
    this.router.navigate(['/signup'])
  }

  get mail() {
    return this.logForm.get('mail');
  }

  get password1() {
    return this.logForm.get('password1');
  }


}
