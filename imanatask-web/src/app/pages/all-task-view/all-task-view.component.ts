import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { faClock, faInfoCircle, faTasks } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-all-task-view',
  templateUrl: './all-task-view.component.html',
  styleUrls: ['./all-task-view.component.scss']
})
export class AllTaskViewComponent implements OnInit {

  completedTasks: any;
  incompledtedTasks: any;
  faClock = faClock;
  faInfoCircle = faInfoCircle;
  faTasks = faTasks;
  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.queue([this.getComplete(), this.move(this.completedTasks, this.incompledtedTasks), this.getIncomplete()]);
  }

  queue(arr) {
    var sequence = Promise.resolve()
    arr.forEach(function (item) {
      sequence = sequence.then(item)
    })
    return sequence
  }

  getComplete() {
    this.taskService.getCompleteTasks().subscribe((res1: any) => {
      if ("_embedded" in res1) {
        this.completedTasks = res1._embedded.taskList;
        console.log(this.completedTasks);
      }
    })
  }

  getIncomplete() {
    this.taskService.getInCompleteTasks().subscribe((res2: any) => {
      if ("_embedded" in res2) {
        this.incompledtedTasks = res2._embedded.taskList;
        console.log(this.incompledtedTasks);
      }
    })
  }

  move(completedTasks, incompledtedTasks) {
    var completeLen = 0;
    var incompleteLen = 0;
    if (completedTasks !== undefined && incompledtedTasks !== undefined) {
      completeLen = completedTasks.length;
      incompleteLen = incompledtedTasks.length;
    }
    var elem = document.getElementById("myBar");
    var width = 0;
    var sumValue = completeLen + incompleteLen;
    if (sumValue !== 0) {
      width = Math.floor(completeLen * 100 / (completeLen + incompleteLen));
    }
    console.log(width);
    if (width <= 100) {
      elem.style.width = width + "%";
      elem.innerHTML = width + "%";
    }

  }


  transferNumDate(deadline: number): string {
    var date = new Date(deadline);
    var month = date.getUTCMonth() + 1; //months from 1-12
    var day = date.getUTCDate();
    var year = date.getUTCFullYear();
    return year + "/" + month + "/" + day;
  }

}
