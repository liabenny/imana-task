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
    var check = new Boolean(true);
    if (title === undefined || title.length === 0) {
      document.getElementById("title").classList.add('is-danger');
      document.getElementById("titleValid").classList.remove('ghost');
      check = false;
    }
    else {
      document.getElementById("title").classList.remove('is-danger');
      document.getElementById("titleValid").classList.add('ghost');
    }
    if (des === undefined || des.length === 0) {
      document.getElementById("des").classList.add('is-danger');
      document.getElementById("desValid").classList.remove('ghost');
      check = false;
    }
    else {
      document.getElementById("des").classList.remove('is-danger');
      document.getElementById("desValid").classList.add('ghost');
    }
    if (deadline === undefined) {
      check = false;
      document.getElementById("timeValid").classList.remove('ghost');
    }
    else {
      document.getElementById("timeValid").classList.add('ghost');
    }

    if (check) {
      this.taskService.createTask(title, des, this.listId, deadline.getTime()).subscribe((res: any) => {
        // now we navigate to lists/response.id
        this.router.navigate(['/lists', res.taskListId]);
      });
    }
  }

}
