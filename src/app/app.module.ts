import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DonorModule } from './donor/donor.module';
import { OrgnizationModule } from './orgnization/orgnization.module';
import { ReceiverModule } from './receiver/receiver.module';
import { LandingPageComponent } from './landing-page/landing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DonorModule,
    OrgnizationModule,
    ReceiverModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
