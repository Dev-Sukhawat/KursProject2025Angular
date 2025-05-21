import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTaskMangerComponent } from './main-task-manger.component';

describe('MainTaskMangerComponent', () => {
  let component: MainTaskMangerComponent;
  let fixture: ComponentFixture<MainTaskMangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainTaskMangerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainTaskMangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
