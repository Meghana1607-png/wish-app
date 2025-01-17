import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonorRoutingModule } from './donor-routing.module';
import { DonorComponent } from './donor.component';
import { DonorFormComponent } from './donor-form/donor-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    DonorComponent,
    DonorFormComponent,
    DashboardComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    DonorRoutingModule
  ]
})
export class DonorModule { }
