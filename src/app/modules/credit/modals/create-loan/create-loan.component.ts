import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { frequencies, loanStatuses } from '../../constants/loan-constant';

@Component({
  selector: 'app-create-loan',
  templateUrl: './create-loan.component.html',
  styleUrls: ['./create-loan.component.scss']
})
export class CreateLoanComponent implements OnInit {

  loanForm: FormGroup;
  isCreateMode: boolean;
  loanData: any;
  isIdNumberExist: boolean = false;
  frequencies = frequencies;
  loanStatuses = loanStatuses;

  constructor(
    public dialogRef: MatDialogRef<CreateLoanComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.initialIzeForm();
    this.isCreateMode = this.data.loanData == undefined;
    this.loanData = this.data.loanData;
  }

  initialIzeForm() {
    this.loanForm = this.fb.group({
      frequency: [''],
      loanStatus: [''],
      refTxn : ['5'],
      noOfInstallment : ['3'],
      principleAmount: ['6000'],
      interestAmount: ['1000'],
      interestRate: ['5'],
      note: ['note'],
      description: ['description']
    });
  }

  submit() {
    if (this.loanForm.valid) {
      this.closeModal(this.loanForm.value);
    }
    else {
      this.loanForm.markAllAsTouched();
    }
  }

  changeStatus(status){
    this.closeModal(status);
  }

  returnTitle() {
    if (this.isCreateMode)
      return "New Loan";
    else return "Change Status";
  }

  closeModal(data) {
    this.dialogRef.close(data);
  }
}
