import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedRoutingModule } from './shared-routing.module';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { ReusableDataTableComponent } from './reusable-data-table/reusable-data-table.component';
import { RouterModule } from '@angular/router';
import { ReusableInputFormComponent } from './reusable-input-form/reusable-input-form.component';
import { SaveButtonComponent } from './save-button/save-button.component';

@NgModule({
  declarations: [
    ProgressSpinnerComponent,
    ReusableDataTableComponent,
    ReusableInputFormComponent,
    SaveButtonComponent,
  ],
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    SharedRoutingModule,
    // BrowserModule,
    // BrowserAnimationsModule,
  ],
  exports: [
    ProgressSpinnerComponent,
    ReusableDataTableComponent,
    ReusableInputFormComponent,
    SaveButtonComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
