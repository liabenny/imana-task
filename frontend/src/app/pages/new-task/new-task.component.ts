import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  listId: string;
  selectedDate: Date;
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params['listId'];
      }
    )
  }

  createTask(title: string, des: string, deadline: Date) {

    this.taskService.createTask(title, des, this.listId, deadline.getTime()).subscribe((res: any) => {
      // now we navigate to lists/response.id
      this.router.navigate(['/lists', res.taskListId]);
    });
  }

}
