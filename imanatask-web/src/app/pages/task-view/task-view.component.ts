import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { Router } from '@angular/router';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: any[];
  tasks: any;
  selectedListId: string;
  faTrash = faTrash;
  faEdit = faEdit;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.listid === undefined) {
          this.tasks = null;
        }
        else {
          this.selectedListId = params.listid;
          this.taskService.getTasks(params.listid).subscribe((task: any[]) => {
            this.tasks = task;
          })
        }
      }
    )

    this.taskService.getLists().subscribe((lists: any[]) => {
      this.lists = lists;
    })
  }

  checkTaskList(lists: any) {
    switch (typeof lists) {
      case 'undefined':
        return null;
      case 'object':
        if (null === lists || lists.length == 0) return null;
        if ("_embedded" in lists) {
          return lists._embedded.taskListList;
        }
        return null;
    }
  }

  checkTask(tasks: any) {
    switch (typeof tasks) {
      case 'undefined':
        return null;
      case 'object':
        if (null === tasks || tasks.length == 0) return null;
        if ("_embedded" in tasks) {
          return tasks._embedded.taskList;
        }
        return null;
    }
  }

  deleteList() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.listid !== undefined) {
          this.taskService.deleteList(params.listid).subscribe((res: any[]) => {
            this.router.navigate(['/lists']);
          })
        }
      }
    )
  }

  onDeleteTaskClick(taskid: string) {
    this.taskService.deleteTask(taskid).subscribe((res: any[]) => {
      var taskList = this.tasks._embedded.taskList;
      for (var i = 0; i < taskList.length; i++) {
        console.log(taskList[i].id);
        console.log(taskid);
        if (taskList[i].id === taskid) {
          console.log(taskList[i]);
          this.tasks._embedded.taskList.splice(i, 1);
          break;
        }
      }
      location.reload();
    })
  }

  onTaskClick(task: any) {
    if (task.isComplete === false) {
      this.taskService.markCompleted(task).subscribe(() => {
        // the task has been set to be completed successfully
        task.isComplete = true;
      })
    }
    else {
      this.taskService.markIncompleted(task).subscribe(() => {
        // the task has been set to be incomplete successfully
        task.isComplete = false;
      })
    }
  }

  checkAddTask() {
    if (this.selectedListId === undefined) {
      alert('You have to select a task list first!');
    }
    else {
      var url = "http://" + window.location.host + "/lists/" + this.selectedListId + "/new-task";
      console.log(window.location.host)
      console.log(url);
      window.location.href = url;
    }
  }
}
