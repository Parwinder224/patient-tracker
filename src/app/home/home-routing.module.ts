import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { AddPatientComponent } from './add-patient/add-patient.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    // children: [
    //   {
    //     path: 'add-patient',
    //     component: AddPatientComponent // Use standalone component here
    //   }
    // ]
  },
  {
    path: 'add-patient',
    component : AddPatientComponent
  },
  { path: 'edit-patient/:id', component: AddPatientComponent }
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
