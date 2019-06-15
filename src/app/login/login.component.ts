import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {TitleService} from '../services/title.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  saving = false;
  submitted = false;
  returnUrl: string;
  error = '';
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private titleService: TitleService
  ) {

    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  get rememberMe() {
    return this.loginFormGroup.get('rememberMe');
  }

  get f() {
    return this.loginFormGroup.controls;
  }

  get username() {
    return this.loginFormGroup.get('username');
  }

  get password() {
    return this.loginFormGroup.get('password');
  }

  ngOnInit() {
    this.titleService.init();
    this.loginFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.loginFormGroup.markAllAsTouched();
    this.submitted = true;

    if (this.loginFormGroup.invalid) {
      return;
    }

    this.saving = true;
    this.authenticationService.login(this.loginFormGroup.value)
      .pipe(first())
      .subscribe(
        data => {
          this.saving = false;
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = 'Email lub hasło jest niepoprawne. Spróbuj  jeszcze raz';
          this.saving = false;
        });
  }
}
