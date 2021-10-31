import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { UsersService } from 'src/app/services/db/users.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  public userId: any;
  public user: any;
  public userForm: FormGroup;
  public isLoading = false;

  constructor(
    private utilsService: UtilsService,
    private userService: UsersService,
    private location: Location,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.userForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.userId = params['id'];
      }
    });
    this.fetch();
  }

  async fetch() {
    if (this.userId) {
      let response = await this.userService.getUser(this.userId);
      this.user = this.utilsService.getKeyValue('data')(response);
      this.userForm.patchValue(this.user);
    }
  }

  async submit() {
    if (this.userForm.invalid) {
      this.utilsService.forwardErrorMessage(
        'Failed to save because some fields are empty.'
      );
      return;
    }
    this.isLoading = true;

    try {
      if (this.userId) {
        await this.userService.updateUser(this.userId, this.userForm.value);

        this.utilsService.handleSuccess(
          `User ${this.userId} was updated successfully`
        );
        // const id = await this.authService.getAdminId();
        // if (id && this.userId.toString() == id.toString()) {
        //   await this.authService.refresh();
        // }
      } else {
        await this.userService.addUser(this.userForm.value);
        this.utilsService.handleSuccess('User was added successfully');
      }
      this.location.back();
    } catch (error) {
      console.log(error);
      this.utilsService.forwardErrorMessage('Failed to save User.');
    }
    this.isLoading = false;
  }
}
