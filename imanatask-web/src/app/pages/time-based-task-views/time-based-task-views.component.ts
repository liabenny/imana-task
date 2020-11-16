import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-time-based-task-views',
  templateUrl: './time-based-task-views.component.html',
  styleUrls: ['./time-based-task-views.component.scss']
})
export class TimeBasedTaskViewsComponent implements OnInit {

  currentTime = new Date().getTime();
  pastTasks: any;
  oneDayTasks: any;
  oneWeekTasks: any;
  afterOneWeekTasks: any;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  getPastTasks() {
    this.taskService.getCompleteTasks().subscribe((res1: any) => {
      if ("_embedded" in res1) {
        this.pastTasks = res1._embedded.taskList;
      }
    })
  }

  getOneDayTasks() {

  }

  getOneWeekTasks() {

  }

  getAfterOneWeekTasks() {

  }

}
