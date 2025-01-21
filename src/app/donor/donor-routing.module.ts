import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AwarenessComponent } from './awareness/awareness.component';

const routes: Routes = [
{
  path:'dashboard', 
  component: DashboardComponent
},
{
  path:'donor-profile',
  component:ProfileComponent
},
{path:'awareness',component:AwarenessComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonorRoutingModule { }
