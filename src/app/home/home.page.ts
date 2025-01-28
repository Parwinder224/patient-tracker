import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../services/patient.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  patients: any = [];
  patientData: any = [];
  filteredPatients = [];
  currentPage = 1;
  patientsPerPage = 5;
  // totalPages = Math.ceil(this.patientData.length / this.patientsPerPage);

  selectedPatient: any = null;
  totalPages!: number;

  constructor(private patientService: PatientService, private route: ActivatedRoute) {
    this.getPatientDetail();
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['reload']) {
        this.getPatientDetail();
      }
    });
  }

  // get patient list
  getPatientDetail() {
    this.patientService.getAllPatientData().subscribe((data: any) => {
      this.patientData = data;
      this.patientData.forEach((e: any) => {
        if (e.gender == 1) {
          e.genderr = 'Male';
        }
        else if (e.gender == 2) {
          e.genderr = 'Female';
        }
      });
    })
  }

  deletePatient(id: any, i: any) {
    if (window.confirm('Do you want to go ahead?')) {
      this.patientService.deletePatient(id).subscribe((data: any) => {
        this.patientData.splice(data, 1);
      });
    }
  }


  // Close patient detailsz
  closeDetails() {
    this.selectedPatient = null;
  }

  // Search patients
  onSearch(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredPatients = this.patientData
      .filter((patient: { name: string; }) => patient.name.toLowerCase().includes(query));
    this.currentPage = 1; // Reset to the first page when a new search is made
  }

  // Go to previous page
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Go to next page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}



