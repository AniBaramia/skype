import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Friend } from 'src/assets/user';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss'],
})
export class FriendListComponent implements OnInit {
  @Output()
  selected = new EventEmitter<number>();

  friends: any = [];
  selectedFriendId?: number;
  userInfo: any;
  authUserId?: any;
  users: any = [];
  username?: any;
  popupvisibility = false;

  userId?: number;
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authUserId = sessionStorage.getItem('authUserId') as string;

    this.httpClient
      .get('http://localhost:3000/users?id=' + this.authUserId)
      .subscribe((response) => {
        this.users = response;
        this.userInfo = this.users[0].username;
      });

    const id = this.activatedRoute.snapshot.paramMap.get('friendId');

    if (id) {
      this.selectedFriendId = +id;
      this.selected.emit(+id);
    }
    this.getFriend();
  }

  getFriend() {
    this.httpClient
      .get('http://localhost:3000/friends?userId=' + this.authUserId)
      .subscribe((response) => {
        this.friends = response;
      });
  }
  clickOnFriend(friend: Friend) {
    this.selectedFriendId = friend.id;

    this.selected.emit(friend.id);
  }
  addOnClick() {
    this.username = '';
    this.popupvisibility = true;
  }

  canelOnClick() {
    this.popupvisibility = false;
  }
  createOnClick() {
    this.httpClient
      .post('http://localhost:3000/friends', {
        username: this.username,
        userId: this.authUserId,
      })
      .subscribe(() => {
        this.popupvisibility = false;
        this.getFriend();
      });
  }
  logOutOnClick() {
    sessionStorage.removeItem('authUserId');
    this.router.navigate(['login']);
  }
  deleteOnClick(id: number) {
    this.httpClient
      .delete('http://localhost:3000/friends/' + id)
      .subscribe(() => this.getFriend());
  }
}
