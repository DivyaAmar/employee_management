import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn:'root'
})
export class EmployeeService {

  private _url: string = "http://dummy.restapiexample.com/api/v1";
  erroHandler;

  constructor(private http:HttpClient) { }

  /*********************  Returns all the employees  ********************/
  getAllEmployees():Observable<any>{
    return  this.http.get(this._url+'/employees');
  }

/********************* Adding Employee   ********************/
  addEmployee(requestBody): Observable<any> {
    return this.http.post(this._url+"/create",requestBody).pipe(catchError(this.erroHandler));
  }

  /********************* Update employee details ********************/
  updateEmployee(empId, employee): Observable<any> {
    return this.http.put(this._url+`/update/${empId}`,employee).pipe(catchError(this.erroHandler));;
  }

  /********************* Deletes an employee from employee list ********************/
  deleteEmployee(id:string){
    return this.http.delete(this._url+`/delete/${id}`);
  }

   /********************* Returns an employee with passed employee id from employee list  ********************/
  getEmployee(id:string) {
    return this.http.get(this._url+`/employee/${id}`).pipe(catchError(this.erroHandler));
  }
}
