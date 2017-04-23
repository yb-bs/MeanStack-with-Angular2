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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var EmployeeService = (function () {
    function EmployeeService(http) {
        this.http = http;
        console.log('Employee Service Initialized...');
    }
    EmployeeService.prototype.getEmployees = function () {
        return this.http.get('/api/employees')
            .map(function (res) { return res.json(); });
    };
    EmployeeService.prototype.editEmployee = function (email) {
        return this.http.get('/api/employee/' + email)
            .map(function (res) { return res.json(); });
    };
    EmployeeService.prototype.addEmployee = function (newEmployee) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/employee', JSON.stringify(newEmployee), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    EmployeeService.prototype.deleteEmployee = function (email) {
        return this.http.delete('/api/employee/' + email)
            .map(function (res) { return res.json(); });
    };
    EmployeeService.prototype.updateEmployee = function (employee) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/api/employee/' + employee.email, JSON.stringify(employee), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    return EmployeeService;
}());
EmployeeService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], EmployeeService);
exports.EmployeeService = EmployeeService;
//# sourceMappingURL=employees.service.js.map