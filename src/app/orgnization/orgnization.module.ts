import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgnizationRoutingModule } from './orgnization-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrgCardComponent } from './org-card/org-card.component';
import { ViewOrgFormComponent } from './org-register-form/view-org-form.component';
import { RequestsComponent } from './requests/requests.component';
import { OrgRequestsComponent } from './org-requests/org-requests.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

@NgModule({
  declarations: [
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
