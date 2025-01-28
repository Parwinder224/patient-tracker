import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonHeader, IonTitle } from "@ionic/angular/standalone";
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule]
})
export class AddPatientComponent implements OnInit {

  patientForm!: FormGroup;
  getId!: any;

  constructor(private formBuilder: FormBuilder,
    private patientService: PatientService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
  ) {

    this.activatedRoute.paramMap.subscribe((params) => {
      this.getId = params.get('id');
      console.log('Received ID:', this.getId); // Debug log  
    });
  }

  ngOnInit() {
    this.patientForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required, Validators.min(1)]],
      gender: ['', [Validators.required]],
      address: ['', [Validators.required]],
      complaint: ['', [Validators.required]],
      medical_history: [''],
      investigations: [''],
      diagnosis: [''],
      treatment_plan: [''],
      remarks: [''],
      old_patient: [false]
    });

    if (this.getId) {
      this.patientService.getPatient(this.getId).subscribe((data: any) => {
        if (data) {
          this.patientForm.patchValue({   
            gender: data.gender === 1 ? 'Male' : 'Female',  
          });
          this.patientForm.patchValue(data);       
        }
      })
    }
  }

  // Handle form submission
  onSubmit() {
    if (this.getId) {
      this.onUpdate();  //in case of update
    }
    else {
      this.onAddPatient();
    }
  }

  onAddPatient() {
    if (this.patientForm.valid) {
      this.patientService.addPatient(this.patientForm.value).subscribe(
        (res: any) => {
          this.route.navigate(['/home'], { queryParams: { reload: true } });
        },
        (err: any) => {
          console.log(err);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  onUpdate() {

    if (this.patientForm.valid) {
      this.patientService.updatePatient(this.getId, this.patientForm.value).subscribe(
        (res: any) => {
          // this.route.navigateByUrl('/home');
          this.route.navigate(['/home'], { queryParams: { reload: true } });

        },
        (err: any) => {
          console.log(err);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  resetForm() {
    this.patientForm.reset();
  }
}
