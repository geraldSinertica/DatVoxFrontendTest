import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { LoginComponent } from './login/login.component';
import { ReportComponent } from './report/report.component';

import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { ReactiveFormsModule } from '@angular/forms';
import { ReportBrowseComponent } from './repor-browse/repor-browse.component';

@NgModule({
  declarations: [LoginComponent, ReportComponent,ReportBrowseComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule
  ],
})
export class HomeModule {}
