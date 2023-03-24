import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/assets/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  user: User = {};
  users: any = [];
  constructor(private httpClient: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  registerOnClick(user: User) {
    this.httpClient
      .get('http://localhost:3000/users?username=' + user.username)
      .subscribe((response) => {
        this.users = response;

        if (this.users.length > 0) {
          alert('this username is already taken');
        } else {
          this.httpClient
            .post('http://localhost:3000/users', user)
            .subscribe(() => {
              this.router.navigate(['login']);
            });
        }
      });
  }
}
