import { Injectable, inject } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  Timestamp,
  addDoc,
  collection,
  collectionData
} from '@angular/fire/firestore';
import { Employee } from '../model/employee';

/** Shape of an employee as it is stored in Firestore. */
interface EmployeeDocument {
  name: string;
  dateOfBirth: Timestamp | Date | string;
  city: string;
  salary: number;
  gender?: string;
  email?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private firestore: Firestore = inject(Firestore);
  private employees?: Observable<readonly Employee[]>;

  get $(): Observable<readonly Employee[]> {
    // Built once and then shared: this getter runs on every change detection
    // cycle, and returning a new observable each time would make AsyncPipe
    // resubscribe — opening a new Firestore listener — over and over.
    if (!this.employees) {
      this.employees = collectionData(this.employeesCollection()).pipe(
        map((documents: DocumentData[]) =>
          documents.map((document) => this.toEmployee(<EmployeeDocument>document))
        ),
        shareReplay({ bufferSize: 1, refCount: true })
      );
    }

    return this.employees;
  }

  async saveEmployee(employee: Employee): Promise<void> {
    // Firestore expects a plain object rather than a custom class instance.
    const employeeData = {
      name: employee.name,
      dateOfBirth: employee.dateOfBirth,
      city: employee.city,
      salary: employee.salary,
      gender: employee.gender ?? '',
      email: employee.email ?? ''
    };

    await addDoc(this.employeesCollection(), employeeData);

    // No local bookkeeping needed: collectionData() is a live listener, so the
    // new document shows up in the list on its own.
  }

  private employeesCollection(): CollectionReference<DocumentData> {
    return collection(this.firestore, 'employees');
  }

  private toEmployee(document: EmployeeDocument): Employee {
    return new Employee(
      document.name,
      this.toDate(document.dateOfBirth),
      document.city,
      document.salary,
      document.gender,
      document.email
    );
  }

  private toDate(value: Timestamp | Date | string): Date {
    // A Date written to Firestore comes back as a Timestamp, which the
    // DatePipe in the template cannot format on its own.
    if (value instanceof Timestamp) {
      return value.toDate();
    }

    return value instanceof Date ? value : new Date(value);
  }
}
