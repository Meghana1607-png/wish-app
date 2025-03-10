import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonorFormComponent } from './donor-form/donor-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'donor-form', component: DonorFormComponent},
{
  path:'dashboard', 
  component: DashboardComponent
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonorRoutingModule { }
