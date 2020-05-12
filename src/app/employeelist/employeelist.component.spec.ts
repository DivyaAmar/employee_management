import { async, ComponentFixture, TestBed, getTestBed, fakeAsync, tick } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { EmployeeService } from '../services/employeeservice.service';
import { EmployeeInfoService } from '../services/employeeInfo.service';
import { EmployeeListComponent } from './employeelist.component';


describe('EmployeeListComponent', () => {
    let component: EmployeeListComponent;
    let fixture: ComponentFixture<EmployeeListComponent>;
    const routes: Routes = [
        { path: '', redirectTo: '/employees', pathMatch: 'full' },
        { path: 'employees', component: EmployeeListComponent },
    ];
    const formBuilder: FormBuilder = new FormBuilder();
    function setFormValues(fromData) {
        component.editProfileForm.controls.name.setValue(fromData.name)
        component.editProfileForm.controls.age.setValue(fromData.age)
        component.editProfileForm.controls.salary.setValue(fromData.salary)
    }
    
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EmployeeListComponent],
            imports: [
                HttpClientTestingModule, 
                FontAwesomeModule, 
                ReactiveFormsModule, 
                FormsModule, 
                NgxSpinnerModule, 
                NgxPaginationModule, 
                Ng2SearchPipeModule,
                ToastrModule.forRoot(),
                NgbModule,
                HttpClientModule, 
                RouterModule.forRoot(routes), 
                BrowserModule, 
                BrowserAnimationsModule],
            providers: [
                ToastrService, 
                NgxSpinnerService, 
                EmployeeService, 
                EmployeeInfoService,
                { provide: FormBuilder, useValue: formBuilder }]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EmployeeListComponent);
        component = fixture.componentInstance;
        component.editProfileForm = formBuilder.group({
            name: new FormControl(null, Validators.required),
            age: new FormControl(null, Validators.required),
            salary: new FormControl(null, Validators.required),
        });
        fixture.detectChanges();
    });



    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have valid form', () => {
        const data = {
            name:'Ram',
            age:'22',
            salary:'27537'
        };
        setFormValues(data);
        expect(component.editProfileForm.valid).toBe(true);
    });
    it('should have invalid form', () => {
        const data = {
            name:'Ram',
            age:'',
            salary:'27537'
        };
        setFormValues(data);
        expect(component.editProfileForm.valid).toBe(false);
    });
   

});
