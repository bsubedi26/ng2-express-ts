import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard.component';
import { routing } from './dashboard.router';
import { SharedModule } from '../../shared/shared.module';
import { UserInfoComponent } from './user-info/user-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    routing
  ],
  declarations: [
    DashboardComponent,
    UserInfoComponent
  ],
  bootstrap: [
    DashboardComponent
  ]
})
export class DashboardModule {}
