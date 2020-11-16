import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeBasedTaskViewsComponent } from './time-based-task-views.component';

describe('TimeBasedTaskViewsComponent', () => {
  let component: TimeBasedTaskViewsComponent;
  let fixture: ComponentFixture<TimeBasedTaskViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeBasedTaskViewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeBasedTaskViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
