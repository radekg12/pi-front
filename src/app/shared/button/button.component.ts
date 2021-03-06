import {Component, Input, OnInit} from '@angular/core';

type ButtonType = 'submit' | 'button' | 'reset';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})


export class ButtonComponent implements OnInit {

  @Input() public message: string;
  @Input() public loading = false;
  @Input() public disabled = false;
  @Input() public type: ButtonType = 'button';

  constructor() {
  }

  ngOnInit() {
  }

}
