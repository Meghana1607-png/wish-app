import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceiverComponent } from './receiver.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{ path: 'receiver', component: ReceiverComponent },
  {
    path:'rprofile',
    component:ProfileComponent
  },
  {
    path:'rec-dashboard',
    component:DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceiverRoutingModule { }
