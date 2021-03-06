import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewListComponent } from './pages/new-list/new-list.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { EditListComponent } from './pages/edit-list/edit-list.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { AllTaskViewComponent } from './pages/all-task-view/all-task-view.component';
import { TimeBasedTaskViewsComponent } from './pages/time-based-task-views/time-based-task-views.component';

const routes: Routes = [
  { path: '', redirectTo: 'lists', pathMatch: 'full' },
  { path: 'new-list', component: NewListComponent },
  { path: 'edit-list/:listid', component: EditListComponent },
  { path: 'lists', component: TaskViewComponent },
  { path: 'lists/:listid', component: TaskViewComponent },
  { path: 'lists/:listId/new-task', component: NewTaskComponent },
  { path: 'lists/:listId/edit-task/:taskId', component: EditTaskComponent },
  { path: 'all-task-view', component: AllTaskViewComponent },
  { path: 'time-based-task-view', component: TimeBasedTaskViewsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
