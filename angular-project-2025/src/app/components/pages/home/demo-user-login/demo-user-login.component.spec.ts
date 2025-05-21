import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoUserLoginComponent } from './demo-user-login.component';

describe('DemoUserLoginComponent', () => {
  let component: DemoUserLoginComponent;
  let fixture: ComponentFixture<DemoUserLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoUserLoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DemoUserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
