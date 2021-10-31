import { Component } from '@angular/core';
import { UtilsService } from './services/utils/utils.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'PreventiaTask';
  public logoutFlag: boolean = false;

  constructor(
    private authService: AuthService,
    private utilsService: UtilsService,
    private toastService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscribeToastr();
    this.subscribeUser();
  }

  subscribeToastr() {
    this.utilsService.toastObjValue.subscribe((toastObj) => {
      if (toastObj.errorFlag == -1) return;
      if (toastObj?.errorFlag)
        this.toastService.error('', toastObj.message, {
          timeOut: 3000,
        });
      else
        this.toastService.success('', toastObj.message, {
          timeOut: 3000,
        });
    });
  }
  subscribeUser() {
    this.authService.currentUserValue.subscribe((user) => {
      console.log('User ==> ', user);
      console.log('Current User ==> ', this.authService.getCurrentUser());
      this.logoutFlag =
        user != null || this.authService.getCurrentUser() != null;
    });
  }
  logout() {
    this.authService.logout();
    this.router.navigate([`/`]);
  }
}
