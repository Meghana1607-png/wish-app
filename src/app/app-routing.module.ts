import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   { path: 'route-path', loadChildren: () => import('./donor/donor.module').then(m => m.DonorModule) }, 
   { path: 'route-path', loadChildren: () => import('./receiver/receiver.module').then(m => m.ReceiverModule) }, 
   { path: 'route-path', loadChildren: () => import('./orgnization/orgnization.module').then(m => m.OrgnizationModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
