"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var employees_service_1 = require("../../services/employees.service");
var EmployeesComponent = (function () {
    function EmployeesComponent(employeeService) {
        var _this = this;
        this.employeeService = employeeService;
        this.employeeService.getTasks()
            .subscribe(function (employees) {
            _this.employees = employees;
            // this.age = new Date().getDate() - this.dob.getDate();
            console.log("Age : " + _this.age);
        });
    }
    EmployeesComponent.prototype.addEmployee = function () {
        var _this = this;
        var newEmployee = {
            name: this.name,
            email: this.email,
            dob: this.dob,
            dept: this.dept,
            gender: this.gender
        };
        this.employeeService.addEmployee(newEmployee)
            .subscribe(function (newEmployee) {
            _this.employees.push(newEmployee);
            _this.email = '';
        });
    };
    EmployeesComponent.prototype.deleteEmployee = function (email) {
        var employees = this.employees;
        this.employeeService.deleteEmployee(email).subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < employees.length; i++) {
                    if (employees[i].email == email) {
                        employees.splice(i, 1);
                    }
                }
            }
        });
    };
    EmployeesComponent.prototype.updateEmployee = function () {
        var _this = this;
        var employee = {
            name: this.name,
            email: this.email,
            dob: this.dob,
            dept: this.dept,
            gender: this.gender
        };
        this.employeeService.updateEmployee(employee).subscribe(function (data) {
            _this.email = '';
        });
    };
    return EmployeesComponent;
}());
EmployeesComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'employees',
        templateUrl: 'employees.component.html'
    }),
    __metadata("design:paramtypes", [employees_service_1.EmployeeService])
], EmployeesComponent);
exports.EmployeesComponent = EmployeesComponent;
//# sourceMappingURL=employees.component.js.map