import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceiverRoutingModule } from './receiver-routing.module';
import { ReceiverComponent } from './receiver.component';


@NgModule({
  declarations: [
    ReceiverComponent
  ],
  imports: [
    CommonModule,
    ReceiverRoutingModule
  ]
})
export class ReceiverModule { }
