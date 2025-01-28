import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Patient } from '../patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  // REST_API: string = 'http://localhost:3000/patient';
  REST_API:string ='https://patient-tracker-knw7.onrender.com/patient';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor(private httpClient: HttpClient) {}
   
   addPatient(data: Patient): Observable<any> {
    let API_URL = `${this.REST_API}`;
    return this.httpClient  
      .post(API_URL, data)
      .pipe(catchError(this.handleError));
  }
  // Get all objects
  getAllPatientData() {
    return this.httpClient.get(`${this.REST_API}`);
  }

  // Get single object
  getPatient(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/${id}`;
      return this.httpClient.get(`${this.REST_API}/${id}`).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // Update
  updatePatient(id: any, data: any): Observable<any> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.httpClient
      .put(API_URL, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }
  
  // Delete
  deletePatient(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.httpClient
      .delete(API_URL, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }
  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      errorMessage;
    });
  }


}
