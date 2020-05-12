import { async, ComponentFixture, TestBed} from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { EmployeeService } from '../services/employeeservice.service';
import { EmployeeInfoService } from '../services/employeeInfo.service';
import { EmployeeDetailComponent } from './employeedetail.component';


describe('EmployeeDetailComponent', () => {
    let component: EmployeeDetailComponent;
    let fixture: ComponentFixture<EmployeeDetailComponent>;
    const routes: Routes = [
        { path: '', redirectTo: '/employees', pathMatch: 'full' },
        { path: 'employees', component: EmployeeDetailComponent },

    ];
    
    let service: EmployeeService;
    let empInfoService: EmployeeInfoService
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EmployeeDetailComponent],
            imports: [
                FontAwesomeModule,
                FormsModule,
                NgbModule,
                RouterModule.forRoot(routes), 
                BrowserModule, 
                HttpClientModule,
                BrowserAnimationsModule],
            providers: [EmployeeService, EmployeeInfoService]
        });
        service = TestBed.get(EmployeeService);
        empInfoService = TestBed.get(EmployeeInfoService);          
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EmployeeDetailComponent);
        component = fixture.componentInstance;
    });



    it('should create', () => {
        expect(component).toBeTruthy();
    });

   

});
