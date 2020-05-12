import { Injectable, EventEmitter } from '@angular/core';
import { IEmployee } from '../entity/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeInfoService {

  empObj: IEmployee;
  constructor() { }
  
  /******************Employee object shared across components
   * empObj : it consists of employee object which needs to be shared
   * **********************/
  sendInfo(empObj): void {
      this.empObj = empObj;
  }
}
