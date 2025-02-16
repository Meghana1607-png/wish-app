import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { OrgListComponent } from './org-list/org-list.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { DonorSigninComponent } from './donor-signin/donor-signin.component';
import { ViewDonorComponent } from './orgnization/view-donor/view-donor.component';

const routes: Routes = [
  {
    path: 'donor',
    loadChildren: () =>
      import('./donor/donor.module').then((m) => m.DonorModule),
  },
  //{ path: 'receiver', loadChildren: () => import('./receiver/receiver.module').then(m => m.ReceiverModule) },
  {
    path: 'org',
    loadChildren: () =>
      import('./orgnization/orgnization.module').then(
        (m) => m.OrgnizationModule
      ),
  },
  {
    path: 'receiver',
    loadChildren: () =>
      import('./receiver/receiver.module').then((m) => m.ReceiverModule),
  },
  { path: 'org/view_donor', component: ViewDonorComponent },
  { path: 'app', component: AppComponent },
  { path: '', component: LandingPageComponent },
  { path: 'org-list', component: OrgListComponent },
  { path: 'Sign-up', component: SignupComponent },
  { path: 'Sign-In', component: SigninComponent },
  { path: 'donor-SignIn', component: DonorSigninComponent },
  // {path:'org-list',component:OrgListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
