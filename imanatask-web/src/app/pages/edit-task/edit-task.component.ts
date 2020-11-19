import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  taskId: string;
  listId: string;
  selectedDate: Date;
  des: string;
  myValue = false;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.taskId = params.taskId;
      this.listId = params.listId;
      this.taskService.getCertainTask(this.taskId).subscribe((res: any) => {
        document.getElementById("title").setAttribute('value', res.name);
        this.des = res.description;
        // document.getElementById("des").setAttribute('value', res.description);
        this.selectedDate = new Date(res.deadline);
      });
    })
  }

  updateTask(title: string, des: string, date: Date) {
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
    if (date === undefined) {
      check = false;
      document.getElementById("timeValid").classList.remove('ghost');
    }
    else {
      document.getElementById("timeValid").classList.add('ghost');
    }
    if (check) {
      this.taskService.updateTask(this.taskId, title, des, this.listId, date.getTime()).subscribe(() => {
        this.router.navigate(['/lists', this.listId]);
      })
    }
  }



}
