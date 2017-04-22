import { Component } from '@angular/core';
import { EmployeeService } from './services/employees.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers: [EmployeeService]
})

export class AppComponent { }
