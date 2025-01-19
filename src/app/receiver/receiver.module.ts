import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceiverComponent } from './receiver.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    ReceiverComponent,
    ProfileComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ReceiverModule { }
