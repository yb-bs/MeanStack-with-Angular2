import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EmployeeService {
    constructor(private http: Http) {
        console.log('Task Service Initialized...');
    }

    getTasks() {
        return this.http.get('/api/employees')
            .map(res => res.json());
    }

    addEmployee(newEmployee) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/employee', JSON.stringify(newEmployee), { headers: headers })
            .map(res => res.json());
    }

    deleteEmployee(email) {
        return this.http.delete('/api/employee/' + email)
            .map(res => res.json());
    }

    updateEmployee(employee) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/api/employee/' + employee.email, JSON.stringify(employee), { headers: headers })
            .map(res => res.json());
    }
}