import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgnizationRoutingModule } from './orgnization-routing.module';
import { OrgnizationComponent } from './orgnization.component';


@NgModule({
  declarations: [
    OrgnizationComponent
  ],
  imports: [
    CommonModule,
    OrgnizationRoutingModule
  ]
})
export class OrgnizationModule { }
