import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ui-input',
  templateUrl: './ui-input.component.html',
  styleUrls: ['./ui-input.component.scss'],
})
export class UiInputComponent implements OnInit {
  @Input()
  type = 'text';

  constructor() {}

  ngOnInit(): void {}
}
