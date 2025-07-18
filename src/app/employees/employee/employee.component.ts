import { CommonModule } from '@angular/common';
import { identifierName } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent  {
  employees: any[] = [];
  employee = {
    id: null,
    name: '',
    age: null,
    salary: null
  };

  isEdit = false;
  showError = false;
  showForm = false; // Form is hidden initially means whenever the user land on our page the form will be hidden here.

  constructor() { }

  toggleForm(){
    this.reset();
    this.showForm=true; //Here the user whenever clicks it will show the form as it has been true here.
  }



  save() {
    if (!this.employee.name || this.employee.age === null || this.employee.salary === null || this.employee.age <= 0 || this.employee.salary <= 0 ) {
      this.showError= true;
      return;
    }

    this.showError = false;
   if (this.isEdit) {
      const index = this.employees.findIndex(emp => emp.id === this.employee.id);
      if (index !== -1) {
        this.employees[index] = { ...this.employee };
      }
    } else {
      const newEmployee = { ...this.employee, id: Date.now() };
      this.employees.push(newEmployee);
    }
    //This is for resetting the whole page.
    this.showForm = false; // Here the form will be hidden after create button got clicked.
    this.reset();
  }


  edit(emp: any) {
    //This method is for editing the record in our application.
    this.employee = { ...emp };
    this.isEdit = true;
    this.showForm = true;
  }

  delete(id: number) {
    //This is for deleting the record in our application
      this.employees = this.employees.filter(emp => emp.id !== id);
    this.reset();
  }

  reset() {
    this.employee = {
      id: null,
      name: '',
      age: null,
      salary: null
    };
    this.isEdit = false;
  }

  //This is for whenever user will be in any field on the page it should hide the error message.
   onInputChange() {
    if (this.showError) {
      this.showError = false;
    }
  }
}
