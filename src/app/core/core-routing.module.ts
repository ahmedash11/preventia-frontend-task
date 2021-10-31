import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestGuard } from '../guards/guest.guard';
import { UserGuard } from '../guards/user.guard';
import { CoreComponent } from './core.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileModule } from './profile/profile.module';

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      {
        path: '',
        canActivate: [GuestGuard],
        component: LandingComponent,
      },
      {
        path: 'profile',
        canActivate: [UserGuard],
        loadChildren: () => ProfileModule,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
