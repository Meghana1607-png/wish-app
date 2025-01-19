import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonorRoutingModule } from './donor-routing.module';
import { DonorComponent } from './donor.component';
import { DonorFormComponent } from './donor-form/donor-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DonorComponent,
    DonorFormComponent,
    DashboardComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    DonorRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DonorModule { }
