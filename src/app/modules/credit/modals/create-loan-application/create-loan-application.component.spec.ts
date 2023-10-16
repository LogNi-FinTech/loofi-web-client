import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLoanApplicationComponent } from './create-loan-application.component';

describe('CreateLoanApplicationComponent', () => {
  let component: CreateLoanApplicationComponent;
  let fixture: ComponentFixture<CreateLoanApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLoanApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLoanApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
