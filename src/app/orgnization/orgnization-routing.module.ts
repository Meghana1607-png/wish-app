import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewOrgFormComponent } from './org-register-form/view-org-form.component'; // Correct import path
import { RequestsComponent } from './requests/requests.component';
import { SignInComponent } from './sign-in-page/sign-in.component'; // Correct import path

const routes: Routes = [
  { path: 'sign-up', component: SignUpComponent },
  { path: 'org-dashboard', component: DashboardComponent },
  { path: 'view-org', component: ViewOrgFormComponent },
  { path: 'req', component: RequestsComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-in', component: SignInComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgnizationRoutingModule { }
