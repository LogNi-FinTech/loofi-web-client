import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRepaymentListComponent } from './loan-repayment-list.component';

describe('LoanRepaymentListComponent', () => {
  let component: LoanRepaymentListComponent;
  let fixture: ComponentFixture<LoanRepaymentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanRepaymentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanRepaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
