import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AwarenessComponent } from './donor/awareness/awareness.component';
import { OrgListComponent } from './org-list/org-list.component';

const routes: Routes = [
  {path: 'donor', loadChildren: () => import('./donor/donor.module').then(m => m.DonorModule) }, 
  //{ path: 'receiver', loadChildren: () => import('./receiver/receiver.module').then(m => m.ReceiverModule) }, 
  {path: 'org', loadChildren: () => import('./orgnization/orgnization.module').then(m => m.OrgnizationModule) },
  {path:'receiver',loadChildren:() => import('./receiver/receiver.module').then(m => m.ReceiverModule)},
  {path:'app',component:AppComponent },
  {path:'landing',component:LandingPageComponent},
{path:'org-list',component:OrgListComponent},

  {path:'org-list',component:OrgListComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
