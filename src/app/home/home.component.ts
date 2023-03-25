import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Friend, User } from 'src/assets/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userInfo: any;
  authUserId?: any;
  users: any = [];
  username?: any;
  selectedFriendId?: number;
  friends?: any;

  popupvisibility = false;

  constructor(private httpClient: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.authUserId = sessionStorage.getItem('authUserId') as string;

    this.httpClient
      .get('http://localhost:3000/users?id=' + this.authUserId)
      .subscribe((response) => {
        this.users = response;
        this.userInfo = this.users[0].username;
      });
  }

  onSelectedFriend(friendId: number) {
    this.selectedFriendId = friendId;
  }
}
