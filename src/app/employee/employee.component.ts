import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { EmployeeService } from "../service/employee.service";
import { Router, RouterLink } from "@angular/router";
import { Employee } from "../model/employee";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule]
})
export class EmployeeComponent {
  saveError: string = '';
  private builder: FormBuilder = inject(FormBuilder);
  private employeeService: EmployeeService = inject(EmployeeService);
  private router: Router = inject(Router);
  employeeForm = this.builder.group({
    name: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    city: ['', Validators.required],
    salary: [0, Validators.required],
    gender: ['', Validators.pattern('^[MFX]$')],
    email: ['', Validators.email]
  });

  get name(): AbstractControl<string> { return <AbstractControl<string>>this.employeeForm.get('name'); }
  get dateOfBirth(): AbstractControl<string> { return <AbstractControl<string>>this.employeeForm.get('dateOfBirth'); }
  get city(): AbstractControl<string> { return <AbstractControl>this.employeeForm.get('city'); }
  get salary(): AbstractControl<number> { return <AbstractControl<number>>this.employeeForm.get('salary'); }
  get gender(): AbstractControl<string> { return <AbstractControl<string>>this.employeeForm.get('gender'); }
  get email(): AbstractControl<string> { return <AbstractControl<string>>this.employeeForm.get('email'); }

  withTimeout<T>(task: Promise<T>, timeoutMs: number):  Promise<T> {
    const timer = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`Operation failed and timed out after ${timeoutMs}ms`)), timeoutMs)
    );

    return Promise.race([task, timer]);
  }

  async onSubmit(): Promise<void> {
    if (this.employeeForm.invalid) {
      return;
    }

    const employee: Employee = new Employee(
      this.name.value,
      this.toLocalDate(this.dateOfBirth.value),
      this.city.value,
      this.salary.value,
      this.gender.value,
      this.email.value
    );

    this.saveError = '';

    try {
      await this.withTimeout(this.employeeService.saveEmployee(employee),2000);
      this.employeeForm.reset();
      await this.router.navigate(['/employees']);
    } catch (error) {
      console.error('Unable to save employee in Firestore', error);
      this.saveError = 'Unable to save the employee in Firestore.';
    }
  }

  // The date input gives 'yyyy-MM-dd', which new Date() would read as UTC
  // midnight. Stored and then formatted in local time that lands on the
  // previous day, so build the date from local components instead.
  private toLocalDate(value: string): Date {
    const [year, month, day] = value.split('-').map(Number);

    return new Date(year, month - 1, day);
  }
}
