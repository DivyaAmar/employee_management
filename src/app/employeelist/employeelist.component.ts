import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { faUserPlus, faEdit, faUserTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

import { EmployeeService } from '../services/employee.service';
import { EmployeeInfoService } from '../services/employeeInfo.service';



@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.scss']
})

export class EmployeeListComponent implements OnInit {

/********************* fa icons ************************/ 
  faUserPlus = faUserPlus;
  faEdit = faEdit;
  faUserMinus = faUserTimes;

  public employeeList;
  public errorMsg = null;
  public id;
  public editProfileForm: FormGroup;
  public employeeActionType: string;
  public listFilterBy;
  public pageView:number = 8;

  /********************* Service injected in constructor ************************/ 
  constructor(private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private empInfoService: EmployeeInfoService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router) { }

  /********************* Initializes employee form *********************/
  ngOnInit() {

    this.editProfileForm = this.fb.group({
      name: new FormControl(null, Validators.required),
      age: new FormControl(null, Validators.required),
      salary: new FormControl(null, Validators.required),
    });

    this.spinner.show();
    this.getEmployeeList();
    

  }
  /********************* calling employee list service *********************/
  getEmployeeList(){
   
    this.employeeService.getAllEmployees()
    .subscribe(data => {
      this.employeeList = data['data'];
      this.spinner.hide();
    },
      error => {
        this.errorMsg = error;
        this.spinner.hide();
      });
  }

  /******************** Updating the Employee takes 2 arguments
   * content : it is a model popup obj
   * emp : it is employee object which needs to be updated
   * *********************/
  updateEmployee(content, emp) {

    this.employeeActionType = 'update'
    this.modalService.open(content, {
      centered: true,
      backdrop: 'static'
    });
    this.id = emp['id']
    this.editProfileForm.patchValue({
      name: emp.employee_name,
      age: emp.employee_age,
      salary: emp.employee_salary
    });

  }

  /******************** Adding the Employee takes an argument
   * content : it is a model popup obj 
   * *********************/
  addEmployee(content) {

    this.editProfileForm.reset()
    this.employeeActionType = 'add'
    this.modalService.open(content, {
      centered: true,
      backdrop: 'static'
    });

  }

  /******************** Submiting the Form of Add/Update*********************/
  onSubmit() {
    
    this.spinner.show();
    if (this.employeeActionType == 'add') {
      let employee = {...this.editProfileForm.value} //preparing reuest body
      this.employeeService.addEmployee(employee)
        .subscribe(res => {
          this.employeeList = this.employeeList.concat({
            id: "" + res['data']['id'],
            employee_name: res['data']['name'],
            employee_salary: res['data']['salary'],
            employee_age: res['data']['age'],
          });
          this.spinner.hide();
          this.toastr.success("Employee Added Successfully");
        },
          error => {
            this.spinner.hide();
            this.toastr.error("Employee Updation Failed");
          })
    } else if (this.employeeActionType == 'update') {
      let empPost = { ...this.editProfileForm.value }  //preparing reuest body
      this.employeeService.updateEmployee(this.id, empPost).subscribe((res) => {

    /************************ Updating the employeeList array ************************ */
      let empPostObj = this.employeeList.find(emp => emp.id == this.id);
        let index = this.employeeList.indexOf(empPostObj);
        this.employeeList[index] = {
          "id": this.id,
          "employee_name": this.editProfileForm.value.name,
          "employee_age": this.editProfileForm.value.age,
          "employee_salary": this.editProfileForm.value.salary
        };
        this.spinner.hide();
        this.toastr.success("Employee Updated Successfully");
      },
        error => {
          this.spinner.hide();
          this.toastr.error("Employee Updation Failed");
        });
    }
  }

  /******************** navigate to Employee Detail Page, takes an arguments
   * emp : it is an employee object which needs to be displayed in detail page
   * by calling empInfoService.sendInfo, we will set this value to a variable so that the value is reachable
   * *********************/
  navigateToDetail(emp) {
    this.empInfoService.sendInfo(emp);
    this.router.navigate(['/employee', emp.id], { skipLocationChange: true })
  }

 /******************** Remove the Employee, takes an argument
  * employee: An object which needs to be removed
  * *********************/
  removeEmployee(employee) {
    this.spinner.show();
    this.employeeService.deleteEmployee(employee['id']).subscribe((res) => {
      this.employeeList = this.employeeList.filter(x => {
        return x.id != employee['id'];
      })
      this.spinner.hide();
      this.toastr.success("Employee Deleted Successfully")
    },
    error => {
      this.spinner.hide(); 
      this.toastr.error("Employee Deletion Failed")
    });
  }

  /******************** Comparing the employee list object and the entered input values to enable save button for Update*********************/
  isEnableSaveBtn(){
    let empPostObj = this.employeeList.find(emp => emp.id == this.id);
    let index = this.employeeList.indexOf(empPostObj);
    if(this.employeeList[index]['id'] == this.id && this.employeeList[index]['employee_name'] == this.editProfileForm.value.name &&
    this.employeeList[index]['employee_age'] == this.editProfileForm.value.age && this.employeeList[index]['employee_salary'] == this.editProfileForm.value.salary){
      return true
    } else {
      return false
    }
  }

}
