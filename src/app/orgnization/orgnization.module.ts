import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgnizationRoutingModule } from './orgnization-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrgCardComponent } from './org-card/org-card.component';
import { ViewOrgFormComponent } from './org-register-form/view-org-form.component';
import { RequestsComponent } from './requests/requests.component';
import { SignInComponent } from './sign-in-page/sign-in.component';

@NgModule({
  declarations: [
    SignUpComponent,
    DashboardComponent,
    OrgCardComponent,
    ViewOrgFormComponent,
    RequestsComponent,
    SignInComponent 
  ],
  imports: [
    CommonModule,
    OrgnizationRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OrgnizationModule { }
