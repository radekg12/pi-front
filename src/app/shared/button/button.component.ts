import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {


  @Input() public message: string;
  @Input() public disabled: boolean = false;
  @Input() public type: 'submit' | 'button' | 'reset' = "button";

  constructor() {
  }

  ngOnInit() {
  }

}
