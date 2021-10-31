import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

import { ContentModule } from './content/content.module';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    component: AdminComponent,
    loadChildren: () => ContentModule,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
