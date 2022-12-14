import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

    @ViewChild('fileInput') el!: ElementRef ;
    imageUrl: any = '../../../assets/111.jpg'
    editFile: boolean = true;
    removeUpload: boolean = false;

    signUpForm = this.fb.nonNullable.group({
    file: '',
    firstName: ['' as string, Validators.required],
    lastName: ['' as string, Validators.required],
    mail: ['' as string, Validators.required],
    password1: ['' as string, Validators.required],
    password2: ['' as string, Validators.required],
  })
  constructor(
    private fb: FormBuilder, 
    private router: Router,
    public userService: UserService,
    private cd: ChangeDetectorRef
    ) { }

  stateOptions: any[] = [];
  value1: string = "off";
  uploadedFiles: any[] = [];
  fileToUpload: any;
  userList : SignUser[] = [];


  // path can be removed
  ngOnInit(): void {
    this.stateOptions = [{ label: 'SIGN UP', value: 'off', path:'/signup' },
                         { label: 'LOGIN', value: 'on', path:'/login' }];

    this.userService.getUsers().subscribe({
      next: (users) => { this.userList = users;},
      error: (error) => console.log(error),
      // complete: () => alert('Users fetched') message service or toaster
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
  addUser() {
    this.userService.signUser(this.signUpForm.value).subscribe({
      next : (data: SignUser) => {
        this.userList.push(data);
        this.router.navigate(['/login']);
      },
      error: (error: any) =>{ console.log('Something went wrong')}
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

  uploadFile(event:any) {
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
}
