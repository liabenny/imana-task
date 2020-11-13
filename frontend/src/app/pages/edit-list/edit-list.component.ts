import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }
  listId: string;

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params.listid;
      }
    )
  }

  updateList(updatedName: string) {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.listid !== undefined) {
          this.taskService.updateList(params.listid, updatedName).subscribe((res: any[]) => {
            this.router.navigate([`/lists/${params.listid}`]);
          })
        }
      }
    )
  }

}
