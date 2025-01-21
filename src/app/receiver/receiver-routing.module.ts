import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceiverComponent } from './receiver.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReceiverFormComponent } from './receiver-form/receiver-form.component';
import { RecAwarenessComponent } from './rec-awareness/rec-awareness.component';

const routes: Routes = [{ path: 'r', component: ReceiverComponent },
{
  path: 'rprofile',
  component: ProfileComponent
},
{
  path: 'rec-dashboard',
  component: DashboardComponent
},
{
  path: 'rec-form',

  component: ReceiverFormComponent
},
{ path: 'rec-awareness', component: RecAwarenessComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceiverRoutingModule { }
