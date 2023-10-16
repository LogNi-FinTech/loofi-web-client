import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-loan-repayment',
  templateUrl: './loan-repayment.component.html',
  styleUrls: ['./loan-repayment.component.scss']
})
export class LoanRepaymentComponent implements OnInit {

  repaymentForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<LoanRepaymentComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.initialIzeForm();
  }

  initialIzeForm() {
    this.repaymentForm = this.fb.group({
      paidPrincipleAmount: ['', [Validators.required, Validators.min(0), Validators.max(this.data.unPaidPrincipleAmount)]],
      paidInterestAmount: ['', [Validators.required, Validators.min(0), Validators.max(this.data.unPaidInterestAmount)]],
      txnId: [''],
      txnNote: ['']
    });

    if (!this.data.isPartialPayment) {
      this.repaymentForm.get('paidPrincipleAmount').setValue(0);
      this.repaymentForm.get('paidInterestAmount').setValue(0);
    }
  }

  paidPrincipleAmountErrorMessage(){
    return `Value should be between 0 to ${this.data.unPaidPrincipleAmount}`;
  }

  paidInterestAmountErrorMessage(){
    return `Value should be between 0 to ${this.data.unPaidInterestAmount}`;
  }

  submit() {
    this.closeModal(this.repaymentForm.value);
  }

  returnTitle() {
    return 'Loan Payment'
  }

  closeModal(data) {
    this.dialogRef.close(data);
  }

}
