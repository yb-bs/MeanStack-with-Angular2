import { Component } from '@angular/core';
import {EmployeesService} from '../../services/employees.service';
import {Employee} from '../../../Employee';

@Component({
  moduleId: module.id,
  selector: 'employees',
  templateUrl: 'employees.component.html'
})

export class EmployeesComponent { 
    public employee: Employee[];
    name: string;
    
    constructor(private employeeService:EmployeesService){
        this.employeeService.getEmployees()
            .subscribe(employee => {
                this.employee = employee;
            });
    }
    
    addEmployee(event){
        var newEmployee = {
            name: this.name,
            isDone: false
        }
        
        this.employeeService.addEmployee(newEmployee)
            .subscribe(employee => {
                this.employee.push(employee);
                this.name = '';
            });
    }
    
    deleteEmployee(email){
        var employee = this.employee;
        
        this.employeeService.deleteEmployee(email).subscribe(data => {
            if(data.n == 1){
                for(var i = 0;i < employee.length;i++){
                    if(employee[i].email == email){
                        employee.splice(i, 1);
                    }
                }
            }
        });
    }
    
    updateEmployee(employee){
        var _employee = {
            _id:employee._id,
            title: employee.title,
            isDone: !employee.isDone
        };
        
        this.employeeService.updateEmployee(_employee).subscribe(data => {
            employee.isDone = !employee.isDone;
        });
    }
}
