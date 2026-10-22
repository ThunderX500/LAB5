import { TestBed } from '@angular/core/testing';
import { Firestore } from '@angular/fire/firestore';

import { EmployeeService } from './employee.service';

describe('EmployeeService', () => {
  let service: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // The service injects Firestore; a stub keeps the unit test offline.
      providers: [{ provide: Firestore, useValue: {} }]
    });
    service = TestBed.inject(EmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
