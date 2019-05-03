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
    // redirect to home if already logged in
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
    console.log('Submit...');
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
          console.log(`navigate to ${this.returnUrl} relative to ${this.route}`);
          this.router.navigate([this.returnUrl]);
          console.log('login success');
          console.log(data);
        },
        error => {
          this.error = 'Email lub hasło jest niepoprawne. Spróbuj  jeszcze raz';
          this.saving = false;
          console.log(error);
          console.log('login error');
        });
  }
}
