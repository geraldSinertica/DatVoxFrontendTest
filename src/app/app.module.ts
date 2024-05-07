import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';

import es from '@angular/common/locales/es';

registerLocaleData(es)

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, HomeModule],
  providers: [{provide: LOCALE_ID, useValue: "es"} ],
 // providers: [ ],

  bootstrap: [AppComponent],
})
export class AppModule {}
