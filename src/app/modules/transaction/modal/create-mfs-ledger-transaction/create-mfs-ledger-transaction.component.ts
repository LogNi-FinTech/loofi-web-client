import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-mfs-ledger-transaction',
  templateUrl: './create-mfs-ledger-transaction.component.html',
  styleUrls: ['./create-mfs-ledger-transaction.component.scss']
})
export class CreateMfsLedgerTransactionComponent implements OnInit {

  isTransactionTypeCashIn: boolean = false;
  isTransactionTypeLedger: boolean = false;
  transactionForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<CreateMfsLedgerTransactionComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.initialIzeForm();
    this.checkIsTransactionTypeCashIn(this.data.TransactionType);
    console.log('data.TransactionType :>> ', this.data.TransactionType);
  }

  initialIzeForm() {
    this.transactionForm = this.fb.group({
      toAc: ['', Validators.required],
      fromAC: ['', Validators.required],
      amount: ['', Validators.required],
      note: ['', Validators.required],
      reference: ['', Validators.required],
    });
  }

  checkIsTransactionTypeCashIn(transactionType) {
    if (transactionType === 'BankCashIn') {
      this.transactionForm.controls.fromAC.setValue("110110");
      this.isTransactionTypeCashIn = true;
    }
    else if (transactionType === 'BankCashOut') {
      this.transactionForm.controls.toAc.setValue("110110");
      this.isTransactionTypeCashIn = false;
    }
    else
      this.isTransactionTypeLedger = true;
  }

  submit() {
    this.closeModal(this.transactionForm.value);
  }

  returnTitle() {
    if (this.data.TransactionType == "BankCashOut")
      return "Bank CashOut";
    else if (this.data.TransactionType == "BankCashIn")
      return "Bank CashIn";
    else return "Ledger";
  }

  closeModal(data) {
    this.dialogRef.close(data);
  }
}
