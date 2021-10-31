import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { CoreModule } from './core/core.module';
import { AdminGuard } from './guards/admin.guard';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => CoreModule,
  },
  {
    path: '',
    loadChildren: () => AuthModule,
  },
  {
    path: 'dashboard',
    canActivate: [AdminGuard],
    loadChildren: () => AdminModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
