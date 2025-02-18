import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonorRoutingModule } from './donor-routing.module';
import { DonorComponent } from './donor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AwarenessComponent } from './awareness/awareness.component';
import { SignUpComponent } from './sign-up/sign-up.component';


@NgModule({
  declarations: [
    DonorComponent,
    DashboardComponent,
    ProfileComponent,
    AwarenessComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    DonorRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DonorModule { }
