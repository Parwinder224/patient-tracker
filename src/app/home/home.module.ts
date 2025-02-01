import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  IonicModule } from '@ionic/angular';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import {   HttpClientModule } from '@angular/common/http';
import { AddPatientComponent } from './add-patient/add-patient.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AddPatientComponent
],

    declarations: [HomePage  ]
})
export class HomePageModule {

 }
