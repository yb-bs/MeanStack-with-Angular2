import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../../Task';

@Component({
    moduleId: module.id,
    selector: 'employees',
    templateUrl: 'tasks.component.html'
})

export class TasksComponent {
    tasks: Task[];
    name: string;
    email: string;
    dob: Date;
    dept: string;
    gender: string;
    age: number;

    constructor(private taskService: TaskService) {
        this.taskService.getTasks()
            .subscribe(tasks => {
                this.tasks = tasks;
                this.age = new Date().getDate() - this.dob.getDate();
                console.log("Age : "+ this.age)
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

        this.taskService.addTask(newEmployee)
            .subscribe(task => {
                this.tasks.push(task);
                this.email = '';
            });
    }

    deleteTask(email) {
        var tasks = this.tasks;

        this.taskService.deleteTask(email).subscribe(data => {
            if (data.n == 1) {
                for (var i = 0; i < tasks.length; i++) {
                    if (tasks[i].email == email) {
                        tasks.splice(i, 1);
                    }
                }
            }
        });
    }

    updateStatus(task) {
        var _task = {
            _id: task._id,
            title: task.title,
            isDone: !task.isDone
        };

        this.taskService.updateStatus(_task).subscribe(data => {
            task.isDone = !task.isDone;
        });
    }
}
