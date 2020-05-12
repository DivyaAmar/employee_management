import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faImage, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

import { EmployeeInfoService } from '../services/employeeInfo.service';
import { IEmployee } from '../entity/Employee';

@Component({
  selector: 'app-employeedetail',
  templateUrl: './employeedetail.component.html',
  styleUrls:['./employeedetail.component.scss']
})
export class EmployeeDetailComponent {

  /********************* Input variable to display properties of an employee *******************************/ 
  @Input() employee: IEmployee;

  /********************* fa icons ************************/ 
  faImage = faImage;
  faArrowLeft = faArrowCircleLeft

  /********************* Service injected in constructor ************************/ 
  constructor(private empInfoService: EmployeeInfoService, private router: Router) {}

  ngOnInit() {
    this.employee = this.empInfoService['empObj']
  }
  
  /********************* Go back to employee list page ************************/ 
  navigateToEmpList(){
    this.router.navigate(['/employees'], { skipLocationChange: true })
  }
}