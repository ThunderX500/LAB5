import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private firestore: Firestore = inject(Firestore);
  private employees$: BehaviorSubject<readonly Employee[]> =
    new BehaviorSubject<readonly Employee[]>([]);

  get $(): Observable<readonly Employee[]> {
    return this.employees$;
  }

  async saveEmployee(employee: Employee): Promise<void> {
    const employeesCollection = collection(this.firestore, 'employees');

    // Firestore expects a plain object rather than a custom class instance.
    const employeeData = {
      name: employee.name,
      dateOfBirth: employee.dateOfBirth,
      city: employee.city,
      salary: employee.salary,
      gender: employee.gender ?? '',
      email: employee.email ?? ''
    };

    await addDoc(employeesCollection, employeeData);

    // Keep the starter's current-session list working for now.
    // Reading the list back from Firestore is intentionally left for part 2.
    this.employees$.next([...this.employees$.getValue(), employee]);
  }
}
