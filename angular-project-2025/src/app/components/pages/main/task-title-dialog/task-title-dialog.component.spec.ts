import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTitleDialogComponent } from './task-title-dialog.component';

describe('TaskTitleDialogComponent', () => {
  let component: TaskTitleDialogComponent;
  let fixture: ComponentFixture<TaskTitleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskTitleDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskTitleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
