import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
   { path: 'donor', loadChildren: () => import('./donor/donor.module').then(m => m.DonorModule) }, 
  //  { path: 'receiver', loadChildren: () => import('./receiver/receiver.module').then(m => m.ReceiverModule) }, 
   { path: 'org', loadChildren: () => import('./orgnization/orgnization.module').then(m => m.OrgnizationModule) },
  
  {path:'rec',loadChildren:() => import('./receiver/receiver.module').then(m => m.ReceiverModule)},
  {
    path:'app',component:AppComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  
}
