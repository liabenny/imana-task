import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { HttpParams } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService: WebRequestService) { }

  getLists() {
    return this.webReqService.get('tasklists', {});
  }

  getTasks(tasklistId: string) {
    return this.webReqService.get(`tasklists/${tasklistId}/tasks`, {});
  }

  getCompleteTasks() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("isComplete", "true");

    const data = { headers: headers, params: params };
    return this.webReqService.get('tasks', data);
  }

  getInCompleteTasks() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("isComplete", "false");

    const data = { headers: headers, params: params };
    return this.webReqService.get('tasks', data);
  }

  getTaskWithinRange(startDate: number, endDate: number) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("startDate", startDate.toString()).set("endDate", endDate.toString());

    const data = { headers: headers, params: params };
    return this.webReqService.get('tasks', data);
  }

  getCertainTask(taskId: string) {
    return this.webReqService.get(`tasks/${taskId}`, {});
  }

  createList(title: string) {
    // we want to send a web request to create a list
    const data = {
      headers: {
        accept: 'application/json',
      },
      name: title,
    }
    return this.webReqService.post('tasklists', data);
  }

  createTask(title: string, des: string, id: string, dl: number) {
    console.log(title);
    console.log(des);
    const data = {
      headers: {
        accept: 'application/json',
      },
      name: title,
      description: des,
      taskListId: id,
      deadline: dl,
    }
    return this.webReqService.post('tasks', data);
  }

  deleteList(taskListId: string) {
    return this.webReqService.delete(`tasklists/${taskListId}`);
  }

  deleteTask(taskId: string) {
    return this.webReqService.delete(`tasks/${taskId}`);
  }

  markCompleted(task: any) {
    return this.webReqService.put(`tasks/${task.id}/done`, {});
  }

  markIncompleted(task: any) {
    return this.webReqService.put(`tasks/${task.id}/undo`, {});
  }

  updateList(taskListId: string, updatedName: string) {
    const data = {
      headers: {
        accept: 'application/json',
      },
      name: updatedName,
    }
    return this.webReqService.put(`tasklists/${taskListId}`, data);
  }

  updateTask(taskid: string, title: string, des: string, id: string, date: number) {
    console.log(title);
    console.log(des);
    const data = {
      headers: {
        accept: 'application/json',
      },
      name: title,
      description: des,
      taskListId: id,
      deadline: date,
    }
    return this.webReqService.put(`tasks/${taskid}`, data);
  }

}
