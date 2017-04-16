import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EmployeesService {
    constructor(private http: Http) {
        console.log('Service Initialized...');
    }

    getEmployees() {
        return this.http.get('/api/employees')
            .map(res => res.json());
    }

    addEmployee(newEmployee) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/employees', JSON.stringify(newEmployee), { headers: headers })
            .map(res => res.json());
    }

    deleteEmployee(email) {
        return this.http.delete('/api/employees/' + email)
            .map(res => res.json());
    }

    updateEmployee(employee) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/api/employees/' + employee.email, JSON.stringify(employee), { headers: headers })
            .map(res => res.json());
    }
}