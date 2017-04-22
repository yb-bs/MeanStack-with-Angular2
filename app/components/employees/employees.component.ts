import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employees.service';
import { Employee } from '../../../Employee';

@Component({
    moduleId: module.id,
    selector: 'employees',
    templateUrl: 'employees.component.html'
})

export class EmployeesComponent {
    employees: Employee[];
    name: string;
    email: string;
    dob: Date;
    dept: string;
    gender: string;
    age: number;

    constructor(private employeeService: EmployeeService) {
        this.employeeService.getTasks()
            .subscribe(employees => {
                this.employees = employees;
                // this.age = new Date().getDate() - this.dob.getDate();
                console.log("Age : " + this.age)
            });
    }

    addEmployee() {
        var newEmployee = {
            name: this.name,
            email: this.email,
            dob: this.dob,
            dept: this.dept,
            gender: this.gender
        }

        this.employeeService.addEmployee(newEmployee)
            .subscribe(newEmployee => {
                this.employees.push(newEmployee);
                this.email = '';
            });
    }

    deleteEmployee(email) {
        var employees = this.employees;

        this.employeeService.deleteEmployee(email).subscribe(data => {
            if (data.n == 1) {
                for (var i = 0; i < employees.length; i++) {
                    if (employees[i].email == email) {
                        employees.splice(i, 1);
                    }
                }
            }
        });
    }

    updateEmployee() {
        var employee = {
            name: this.name,
            email: this.email,
            dob: this.dob,
            dept: this.dept,
            gender: this.gender
        }

        this.employeeService.updateEmployee(employee).subscribe(data => {
            this.email = '';
        });
    }
}
