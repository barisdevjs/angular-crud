import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userForm = this.fb.group({
    firstName:['', Validators.required],
    lastName:[''],
    mail:['', Validators.required],
    password1:['', Validators.required],
    password2:['', Validators.required]
  })
  constructor( private fb:FormBuilder) { }

  stateOptions: any[] = [];
  value1: string = "off";
  
  ngOnInit(): void {
    this.stateOptions = [{label: 'Off', value: 'off'}, {label: 'On', value: 'on'}];
  }

  addUser() {
    console.log(this.userForm.value)
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
}
