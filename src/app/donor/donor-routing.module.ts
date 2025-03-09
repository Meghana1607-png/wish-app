import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AwarenessComponent } from './awareness/awareness.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DonorComponent } from './donor.component';

const routes: Routes = [
{
  path:'donor-dashboard', 
  component: DashboardComponent
},
{
  path:'donor-profile',
  component:ProfileComponent
},
{path:'awareness',component:AwarenessComponent},

{path:'dsign-up',component:SignUpComponent},
{path:'d',component:DonorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonorRoutingModule { }
