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
    console.log(title);
    console.log(des);
    this.taskService.updateTask(this.taskId, title, des, this.listId, date.getTime()).subscribe(() => {
      this.router.navigate(['/lists', this.listId]);
    })
  }



}
