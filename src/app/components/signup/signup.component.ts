import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { SignUser } from '../../types/user-type';
import { MessageService } from 'primeng/api';
import { emailValidator } from 'src/app/directives/email-validator.directive';
import { createId } from 'src/app/utils/id';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  @ViewChild('fileInput') el!: ElementRef;
  imageUrl: any = '../../../assets/111.jpg'
  editFile: boolean = true;
  removeUpload: boolean = false;
  isLoggedUser : boolean = false;

  signUpForm = this.fb.nonNullable.group({
    file: '',
    firstName: ['' as string, Validators.required],
    lastName: ['' as string, Validators.required],
    mail: ['' as string,[ Validators.required, emailValidator()]],
    password1: ['' as string, [ Validators.required, Validators.minLength(3), Validators.maxLength(8)]],
    password2: ['' as string, [Validators.required]],
  })
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public userService: UserService,
    private cd: ChangeDetectorRef,
    private ms: MessageService,
  ) { }

  stateOptions: any[] = [];
  value1: string = "off";
  uploadedFiles: any[] = [];
  fileToUpload: any;
  userList: SignUser[] = [];


  // path can be removed
  ngOnInit() {
    this.stateOptions = [{ label: 'SIGN UP', value: 'off', path: '/signup' },
    { label: 'LOGIN', value: 'on', path: '/login' }];

    this.userService.getUsers().subscribe({
      next: (users) => {
        this.userList = users;
        this.ms.add({ severity: 'info', summary: `System is ready for registration`, life: 3000 })
      },
      error: (error) => {
        console.log(error);
        this.ms.add({ severity: 'error', summary: 'Something went wrong', life: 4000 })
      },
    })
  }

  addUser() {
    this.userService.signUser(this.signUpForm.value).subscribe({
      next: (data: SignUser) => {
        this.userList.push({...data,isLogged: this.isLoggedUser, id :createId()});
        this.ms.add({ severity: 'success', summary: 'You are successfully signed in', life: 3000 })
        this.signUpForm.reset();
        this.handleRoute();
      },
      error: (error: any) => {
        this.ms.add({ severity: 'error', summary: 'wait you are being redirected', life: 3000 }),
          console.log(error)
      }
    })
  }

   handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
       this.imageUrl =  event.target.result;
    }
     reader.readAsDataURL(this.fileToUpload);
  }

  async handleRoute() {
    await this.router.navigate(['/login'])
  }

  uploadFile(event: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
         this.signUpForm.patchValue({
          file: reader.result as string
        });
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
       this.cd.markForCheck();
    }
  }

  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl = '../../../assets/111.jpg';
    this.editFile = true;
    this.removeUpload = false;
    this.signUpForm.patchValue({
      file: ''
    });
  }

  get mail() {
    return this.signUpForm.get('mail');
  }

  get firstName() {
    return this.signUpForm.get('firstName');
  }

  get lastName() {
    return this.signUpForm.get('lastName');
  }

  get password1() {
    return this.signUpForm.get('password1');
  }

  get password2() {
    return this.signUpForm.get('password2');
  }
}
