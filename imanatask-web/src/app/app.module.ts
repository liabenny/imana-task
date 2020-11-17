import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';

import { HttpClientModule } from '@angular/common/http';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { EditListComponent } from './pages/edit-list/edit-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { AllTaskViewComponent } from './pages/all-task-view/all-task-view.component';
import { TimeBasedTaskViewsComponent } from './pages/time-based-task-views/time-based-task-views.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskViewComponent,
    NewListComponent,
    NewTaskComponent,
    EditListComponent,
    EditTaskComponent,
    AllTaskViewComponent,
    TimeBasedTaskViewsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    DlDateTimeDateModule,
    DlDateTimePickerModule,
  ],
  providers: [FormsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
