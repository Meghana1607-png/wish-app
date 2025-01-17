import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgnizationComponent } from './orgnization.component';

const routes: Routes = [{ path: '', component: OrgnizationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgnizationRoutingModule { }
