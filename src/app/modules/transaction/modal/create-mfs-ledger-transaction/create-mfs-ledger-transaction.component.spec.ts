import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMfsLedgerTransactionComponent } from './create-mfs-ledger-transaction.component';

describe('CreateMfsLedgerTransactionComponent', () => {
  let component: CreateMfsLedgerTransactionComponent;
  let fixture: ComponentFixture<CreateMfsLedgerTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMfsLedgerTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMfsLedgerTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
