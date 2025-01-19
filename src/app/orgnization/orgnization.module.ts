import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgnizationRoutingModule } from './orgnization-routing.module';
import { OrgnizationComponent } from './orgnization.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrgCardComponent } from './org-card/org-card.component';


@NgModule({
  declarations: [
    OrgnizationComponent,
    DashboardComponent,
    OrgCardComponent
  ],
  imports: [
    CommonModule,
    OrgnizationRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OrgnizationModule { }
