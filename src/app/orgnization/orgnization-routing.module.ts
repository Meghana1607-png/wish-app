import { ApplicationRef, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewOrgFormComponent } from './org-register-form/view-org-form.component'; // Correct import path
import { RequestsComponent } from './requests/requests.component';
import { OrgRequestsComponent } from './org-requests/org-requests.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { OrgProfileComponent } from './org-profile/org-profile.component';
import { PendingReceiversComponent } from './pending-receivers/pending-receivers.component';
import { ApprovedReceiversComponent } from './approved-receivers/approved-receivers.component';
import { RejectedReceiversComponent } from './rejected-receivers/rejected-receivers.component';
import { AllReceiversListComponent } from './all-receivers-list/all-receivers-list.component';

const routes: Routes = [
  {path:'signin',component:SigninComponent},
  {
    path:'org-dashboard',
    component:DashboardComponent
  },
  {path:'signup',component:SignupComponent},
  {path:'view_org',component:ViewOrgFormComponent},
  {path:'req',component:RequestsComponent},
  {path:'org/Profile',component:OrgProfileComponent},
  {path:'org-request',component:OrgRequestsComponent},
  {path:'org-form',component:ViewOrgFormComponent},
  {path:'org/receiversList/pending',component:PendingReceiversComponent},
  {path:'org/receiversList/approved',component:ApprovedReceiversComponent},
  {path:'org/receiversList/rejected',component:RejectedReceiversComponent},
  {path:'org/receiversList',component:AllReceiversListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgnizationRoutingModule { }
