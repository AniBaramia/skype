import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnChanges {
  @Input()
  friendId?: number;
  msg: any;
  texts?: any;
  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnChanges(): void {
    if (this.friendId) {
      this.getChat();
    }
  }
  sendOnClick() {
    const id = this.activatedRoute.snapshot.paramMap.get('friendId');
    this.httpClient
      .post('http://localhost:3000/chat', {
        body: this.msg,
        friendId: id,
      })
      .subscribe(() => {
        (this.msg = ''), this.getChat();
      });
  }

  getChat() {
    this.httpClient
      .get('http://localhost:3000/chat', {
        params: {
          friendId: this.friendId!,
        },
      })
      .subscribe((response) => {
        this.texts = response;
      });
  }
}
