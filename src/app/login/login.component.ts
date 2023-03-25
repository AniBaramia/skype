import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/assets/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../styles/input.scss'],
})
export class LoginComponent implements OnInit {
  user: User = {};
  users: any = [];

  constructor(private httpClient: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  signInOnClick(user: User) {
    this.httpClient
      .get(
        'http://localhost:3000/users?' +
          'username=' +
          user.username +
          '&' +
          'password=' +
          user.password
      )
      .subscribe((response) => {
        this.users = response;

        if (this.users != undefined) {
          sessionStorage.setItem('authUserId', this.users[0].id!.toString());
        }

        if (this.users.length > 0) {
          this.router.navigate(['home']);
        } else {
          alert('Username or password is incorrect');
        }
      });
  }
}
