import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-all-task-view',
  templateUrl: './all-task-view.component.html',
  styleUrls: ['./all-task-view.component.scss']
})
export class AllTaskViewComponent implements OnInit {

  completedTasks: any;
  incompledtedTasks: any;
  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.taskService.getCompleteTasks().subscribe((res1: any) => {
      if ("_embedded" in res1) {
        this.completedTasks = res1._embedded.taskList;
      }
    })

    this.taskService.getInCompleteTasks().subscribe((res2: any) => {
      if ("_embedded" in res2) {
        this.incompledtedTasks = res2._embedded.taskList;
      }
    })
  }



}
