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
import { OrgProfileComponent } from './org-profile/org-profile.component';
import { ApprovedReceiversComponent } from './receiverRequests/approved-receivers/approved-receivers.component';
import { PendingReceiversComponent } from './receiverRequests/pending-receivers/pending-receivers.component';
import { AllReceiversListComponent } from './receiverRequests/all-receivers-list/all-receivers-list.component';
import { RejectedReceiversComponent } from './receiverRequests/rejected-receivers/rejected-receivers.component';
import { AllDonorListComponent } from './donorRequests/all-donor-list/all-donor-list.component';
import { PendingDonorListComponent } from './donorRequests/pending-donor-list/pending-donor-list.component';
import { ApprovedDonorListComponent } from './donorRequests/approved-donor-list/approved-donor-list.component';
import { RejectedDonorsListComponent } from './donorRequests/rejected-donors-list/rejected-donors-list.component';

@NgModule({
  declarations: [
    DashboardComponent,
    OrgCardComponent,
    ViewOrgFormComponent,
    RequestsComponent,
    OrgRequestsComponent,
    SignupComponent,
    SigninComponent,
    OrgProfileComponent,
    ApprovedReceiversComponent,
    PendingReceiversComponent,
    AllReceiversListComponent,
    RejectedReceiversComponent,
    AllDonorListComponent,
    PendingDonorListComponent,
    ApprovedDonorListComponent,
    RejectedDonorsListComponent,
  ],
  imports: [
    CommonModule,
    OrgnizationRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OrgnizationModule { }
