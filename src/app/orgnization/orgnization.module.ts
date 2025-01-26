import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgnizationRoutingModule } from './orgnization-routing.module';
import { OrgnizationComponent } from './orgnization.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrgCardComponent } from './org-card/org-card.component';
import { ViewOrgFormComponent } from './view-org-form/view-org-form.component';
import { RequestsComponent } from './requests/requests.component';
import { OrgRequestsComponent } from './org-requests/org-requests.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

@NgModule({
  declarations: [
    OrgnizationComponent,
    DashboardComponent,
    OrgCardComponent,
    ViewOrgFormComponent,
    RequestsComponent,
    OrgRequestsComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    CommonModule,
    OrgnizationRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OrgnizationModule { }
