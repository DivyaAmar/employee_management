import { TestBed } from '@angular/core/testing';

import { EmployeeService } from './employee.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('EmployeeService', () => {
    let httpMock: HttpTestingController
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [],
    imports: [
        HttpClientTestingModule, 
        HttpClientModule,
    ],
    providers: [
        EmployeeService
    ]
  }));

  it('should be created', () => {
    const service: EmployeeService = TestBed.get(EmployeeService);
    expect(service).toBeTruthy();
  });
  
  it('should be created', () => {
    const service: EmployeeService = TestBed.get(EmployeeService);
    const dummyPosts = [{
        userId: '1',
        id: 1,
        body: 'Http Client',
        title: 'Testing Angular Service'
        }, {
        userId: '2',
        id: 2,
        body: 'Hello World2',
        title: 'Testing Angular Services'
    }];
    service.getAllEmployees().subscribe(posts => {
        expect(posts.length).toBe(2);
        expect(posts).toEqual(dummyPosts);
    });
  });

});