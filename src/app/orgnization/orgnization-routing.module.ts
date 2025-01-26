import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgnizationComponent } from './orgnization.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrgCardComponent } from './org-card/org-card.component';
import { ViewOrgFormComponent } from './view-org-form/view-org-form.component';
import { RequestsComponent } from './requests/requests.component';
import { OrgRequestsComponent } from './org-requests/org-requests.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [{ path: '', component: OrgnizationComponent },
  {
    path:'org-dashboard',
    component:DashboardComponent
  },
  {path:'signin',component:SigninComponent},
  {path:'signup',component:SignupComponent},
  // {
  //   path:'org-card',
  //   component:OrgCardComponent

  // },
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
