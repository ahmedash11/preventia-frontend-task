import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { USERS_IDS } from 'src/app/constants/users.constants';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submit = false;
  USER_IDS = USERS_IDS;
  constructor(
    private authService: AuthService,
    private router: Router,
    private utilsService: UtilsService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  ngOnInit() {}

  async login(loginForm: any) {
    this.submit = true;
    if (loginForm.invalid) {
      return;
    }
    this.loading = true;
    try {
      const response = await this.authService.login(loginForm.value);
      this.setLocalstorage(response);
      this.loading = false;
      this.utilsService.handleSuccess('Login Successful');
      if (this.USER_IDS[this.loginForm.value.email] == 1) {
        this.router.navigate([`/dashboard`]);
      } else {
        this.router.navigate([`/profile`]);
      }
    } catch (err: any) {
      this.utilsService.forwardErrorMessage(err.error.error);
      this.loading = false;
    }
  }

  setLocalstorage(res: any) {
    localStorage.setItem('currentUser', JSON.stringify(this.loginForm.value));
    localStorage.setItem('JWToken', res.token);
    this.authService.forwardUser(this.loginForm.value);
  }
}
