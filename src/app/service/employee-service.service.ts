import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEmployee } from '../emp/employee.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {
  //employees:IEmployee[];
  baseUrl:string = 'http://localhost:3000/employees/'; //local fake json-server
  apiUrl:string = 'http://localhost:8081/Employee/';  //local hosted api link
  constructor(private http:HttpClient) { }

  getEmployees():Observable<IEmployee[]>{
    return this.http.get<IEmployee[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }
  getEmployee(id:number):Observable<IEmployee>{
    return this.http.get<IEmployee>(this.apiUrl+id)
    .pipe(catchError(this.handleError));
  }
  postEmployee(emp:IEmployee):Observable<IEmployee>{
    return this.http.post<IEmployee>(this.apiUrl, emp, {
      headers: new HttpHeaders({
        'Conten-Type':'appplication/json'
      })
    }).pipe(catchError(this.handleError));
  }
  putEmployee(emp:IEmployee,id:number):Observable<IEmployee>{
    return this.http.put<IEmployee>(`${this.apiUrl + id}`, emp, {
      headers: new HttpHeaders({
        'Conten-Type':'appplication/json'
      })
    }).pipe(catchError(this.handleError));
  }
  deleteEmployee(id:number):Observable<void>{
    return this.http.delete<void>(this.apiUrl+id)
    .pipe(catchError(this.handleError));
  }

  //to handle error
  handleError(errorResponse:HttpErrorResponse){
    if(errorResponse.error instanceof ErrorEvent)
      console.log('Client-side error!');
    else
      console.log('Server-side error!');

    return throwError('something went wrong');
  }
  
}
