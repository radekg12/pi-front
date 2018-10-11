import {Component, OnInit} from '@angular/core';
import {User} from "../models/user.model";
import {Router} from "@angular/router";
import {UserService} from "./user.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user: User = new User();

  constructor(private router: Router, private userService: UserService) {
  }

  createUser(): void {
    this.userService.createUser(this.user).subscribe(
      data => alert("User created successfully."),
      error => console.log(error.error.message)
    );
  }

  ngOnInit() {
  }

}
