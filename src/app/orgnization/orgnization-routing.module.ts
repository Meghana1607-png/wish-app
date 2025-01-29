import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewOrgFormComponent } from './org-register-form/view-org-form.component'; // Correct import path
import { RequestsComponent } from './requests/requests.component';
import { OrgRequestsComponent } from './org-requests/org-requests.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:'signin',component:SigninComponent},
  {
    path:'org-dashboard',
    component:DashboardComponent
  },
  {path:'signup',component:SignupComponent},
  {path:'view_org',component:ViewOrgFormComponent},
  {path:'req',component:RequestsComponent},

  {path:'org-request',component:OrgRequestsComponent},
  {
    path:'org-form',component:ViewOrgFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgnizationRoutingModule { }
