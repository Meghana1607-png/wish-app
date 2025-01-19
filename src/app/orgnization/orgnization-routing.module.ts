import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgnizationComponent } from './orgnization.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrgCardComponent } from './org-card/org-card.component';

const routes: Routes = [{ path: '', component: OrgnizationComponent },
  {
    path:'org-dashboard',
    component:DashboardComponent
  },
  // {
  //   path:'org-card',
  //   component:OrgCardComponent

  // }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgnizationRoutingModule { }
