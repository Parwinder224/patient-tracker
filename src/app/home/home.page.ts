import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

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
  selectedTab: string = 'All records';
  // totalPages = Math.ceil(this.patientData.length / this.patientsPerPage);

  selectedPatient: any = null;
  totalPages!: number;
  searchTerm: string = '';

  constructor(private patientService: PatientService, private route: ActivatedRoute,private router:Router,
    private loadingController: LoadingController,private http: HttpClient
  ) {
    this.getPatientDetail();
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['reload']) {
        this.getPatientDetail();
      }
    });
  }

  onTitleClick(id:any) {
     if(id){
      this.router.navigate(['/home/edit-patient'+ '/' +id]);
    }    
  }
  // get patient list
  async getPatientDetail() {
    const loading = await this.loadingController.create({
      message: 'Loading data...',
      spinner: 'crescent',
    });

    await loading.present();
    this.patientService.getAllPatientData().subscribe((data: any) => {
      this.patientData = data;
      this.filteredPatients =data;
      this.patientData.forEach(async (e: any) => {
        if (e.gender == 1) {
          e.genderr = 'Male';
        }
        else if (e.gender == 2) {
          e.genderr = 'Female';
        }
        await loading.dismiss();
      },
      async (error: any) => {
        console.error(error);
        await loading.dismiss();
      }
    );
    })
  }

  deletePatient(id: any, i: any) {
    if (window.confirm('Do you want to go ahead?')) {
      this.patientService.deletePatient(id).subscribe((data: any) => {
        this.patientData.splice(data, 1);
      });
    }
  }

  filterData() {
    this.filteredPatients = this.searchTerm
      ? this.patientData.filter((item: { name: string; }) => item.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
      : [...this.patientData]; // Reset if search is empty
      console.log("filter",this.filteredPatients)
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



