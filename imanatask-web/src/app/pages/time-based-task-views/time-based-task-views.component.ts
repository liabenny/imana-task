import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { faClock, faInfoCircle, faTasks } from '@fortawesome/free-solid-svg-icons';

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
  faClock = faClock;
  faInfoCircle = faInfoCircle;
  faTasks = faTasks;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getPastTasks();
    this.getOneDayTasks();
    this.getOneWeekTasks();
    this.getAfterOneWeekTasks();
  }

  getPastTasks() {
    // console.log("past!!!");
    // console.log(0, this.currentTime - 1);
    this.taskService.getTaskWithinRange(0, this.currentTime - 1).subscribe((res: any) => {
      if ("_embedded" in res) {
        this.pastTasks = res._embedded.taskList;
      }
    })
  }

  getOneDayTasks() {
    // console.log("one day!!!");
    // console.log(this.currentTime, this.currentTime + 86400000);
    this.taskService.getTaskWithinRange(this.currentTime, this.currentTime + 86400000).subscribe((res: any) => {
      if ("_embedded" in res) {
        this.oneDayTasks = res._embedded.taskList;
      }
    })
  }

  getOneWeekTasks() {
    // console.log("one week!!!");
    // console.log(this.currentTime, this.currentTime + 604800000);
    this.taskService.getTaskWithinRange(this.currentTime, this.currentTime + 604800000).subscribe((res: any) => {
      if ("_embedded" in res) {
        this.oneWeekTasks = res._embedded.taskList;
      }
    })
  }

  getAfterOneWeekTasks() {
    // console.log("one week!!!");
    // console.log(this.currentTime + 604800001, this.currentTime + 10000000000000);
    this.taskService.getTaskWithinRange(this.currentTime + 604800001, 10000000000000).subscribe((res: any) => {
      if ("_embedded" in res) {
        this.afterOneWeekTasks = res._embedded.taskList;
      }
    })
  }

  transferNumDate(deadline: number): string {
    var date = new Date(deadline);
    var month = date.getUTCMonth() + 1; //months from 1-12
    var day = date.getUTCDate();
    var year = date.getUTCFullYear();
    return year + "/" + month + "/" + day;
  }

}
