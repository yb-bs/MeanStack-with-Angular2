import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EmployeeService } from '../../services/employees.service';
import { Employee } from '../../../Employee';

@Component({
    moduleId: module.id,
    selector: 'employees',
    templateUrl: 'employees.component.html'
})

export class EmployeesComponent {
    @Input() empemail: String;
    @Output() employee: EventEmitter<Employee>;
    employees: Employee[];
    name: string;
    email: string;
    dob: Date;
    dept: string;
    gender: string;
    age: number;

    constructor(private employeeService: EmployeeService) {
        this.employeeService.getEmployees()
            .subscribe(employees => {
                this.employees = employees;
                // this.age = this.dob.getDate() - new Date().getDate();
                console.log("Age : " + this.age)
            });
    }

    employeeAge(employeeDob) {
        return new Date().getUTCFullYear() - new Date(employeeDob).getUTCFullYear();
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

    editEmployee(email) {
        this.empemail = this.email;
        this.employeeService.editEmployee(email)
            .subscribe(employee => {
                this.name = employee.name;
                this.email = employee.email;
                this.dob = employee.dob;
                this.dept = employee.dept;
                this.gender = employee.gender;
            });
        return this.employee;
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

        this.employeeService.updateEmployee(employee).subscribe(employees => {
            this.email = '';
            this.employees = employees;
        });
    }
}
