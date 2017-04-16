import { Component } from '@angular/core';
import {EmployeesService} from './services/employees.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers:[EmployeesService]
})

export class AppComponent { }
