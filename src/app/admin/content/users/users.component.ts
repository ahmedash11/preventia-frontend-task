import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/db/users.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private utilsService: UtilsService
  ) {}

  public isLoading = false;
  public users = [];
  public cols = [{ value: 'email', title: 'Email', visible: true }];

  ngOnInit() {
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    try {
      let response = await this.usersService.getUsers();
      this.users = this.utilsService.getKeyValue('data')(response);
      // this.admins = response["admins"];
    } catch (error) {
      this.utilsService.forwardErrorMessage('Failed to fetch the users');
    }
    this.isLoading = false;
  }

  async delete(idx: string) {
    try {
      await this.usersService.deleteUser(idx);
      this.utilsService.handleSuccess(`Users ${idx} was successfully deleted`);
      this.fetch();
    } catch (error) {
      this.utilsService.forwardErrorMessage(`Failed to delete User ${idx}`);
    }
  }
}
