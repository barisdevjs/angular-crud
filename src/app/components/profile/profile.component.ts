import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { SignUser } from 'src/app/types/user-type';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private us: UserService,
  ) { }

  userList: SignUser[] = [];
  user: SignUser = {};
  subscription$: Subscription = new Subscription();

  ngOnInit() {
    this.subscription$ = this.us.getUsers().subscribe({
      next: (data: SignUser[]) => {
        this.userList = data;
        this.user = data.find((e: SignUser) => e.isLogged === true) as SignUser;
      },
      error : (err) => { console.log(err)},
    })
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

}
