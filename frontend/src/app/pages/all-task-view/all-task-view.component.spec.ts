import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTaskViewComponent } from './all-task-view.component';

describe('AllTaskViewComponent', () => {
  let component: AllTaskViewComponent;
  let fixture: ComponentFixture<AllTaskViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTaskViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTaskViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
