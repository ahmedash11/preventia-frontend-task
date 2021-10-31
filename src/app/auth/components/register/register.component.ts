import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-signup',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  signUpForm: any;
  loading: any = false;
  submit: any = false;
  constructor(
    private authService: AuthService,
    private utilsService: UtilsService
  ) {
    this.signUpForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  ngOnInit() {}

  async register(formValue: any) {
    this.submit = true;
    if (formValue.valid) {
      this.loading = true;
      try {
        await this.authService.register(formValue.value);
        this.loading = false;
        this.utilsService.handleSuccess('Registration Successful');
      } catch (err: any) {
        this.utilsService.forwardErrorMessage(err.error.error);
        this.loading = false;
      }
    }
  }
}
