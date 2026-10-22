import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { EmployeesComponent } from './employees.component';
import { EmployeeService } from '../service/employee.service';
import { Employee } from '../model/employee';

describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;

  const employees: readonly Employee[] = [
    new Employee('Andrew', new Date('1990-05-17'), 'Ottawa', 50000, 'M', 'andrew@example.com')
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EmployeesComponent],
      // The list only needs an observable of employees, not a live Firestore.
      providers: [provideRouter([]), { provide: EmployeeService, useValue: { $: of(employees) } }]
    });
    fixture = TestBed.createComponent(EmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render one row per employee', () => {
    const rows = (<HTMLElement>fixture.nativeElement).querySelectorAll('tbody tr');
    expect(rows.length).toBe(1);
    expect(rows[0].textContent).toContain('Andrew');
    expect(rows[0].textContent).toContain('Ottawa');
  });
});
