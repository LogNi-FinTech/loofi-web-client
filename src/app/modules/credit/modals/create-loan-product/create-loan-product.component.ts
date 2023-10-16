import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-loan-product',
  templateUrl: './create-loan-product.component.html',
  styleUrls: ['./create-loan-product.component.scss']
})
export class CreateLoanProductComponent implements OnInit {

  loanProductForm: FormGroup;
  isCreateMode: boolean;
  loanProductData: any;
  isIdNumberExist: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CreateLoanProductComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.initialIzeForm();
    this.isCreateMode = this.data.loanProductData == undefined;
    this.loanProductData = this.data.loanProductData;
  }

  initialIzeForm() {
    this.loanProductForm = this.fb.group({
      name: ['loan 1'],
      interestRate: ['5'],
      loanFee : ['5'],
      loanFeeType : ['Percentage'],
      defaultPeriod: ['87345689'],
      maxAmount: ['150000'],
      minAmount: ['100'],
      maxPeriod: ['5'],
      minPeriod: ['1'],
      penaltyRate: ['100'],
      description: ['Khulna'],
      approvalLevel: ['', Validators.max(4)]
    });
  }

  submit() {
    if (this.loanProductForm.valid) {
      this.closeModal(this.loanProductForm.value);
    }
    else {
      this.loanProductForm.markAllAsTouched();
    }
  }

  changeStatus(status){
    this.closeModal(status);
  }

  returnTitle() {
    if (this.isCreateMode)
      return "New Loan-Product";
    else return "Change Status";
  }

  closeModal(data) {
    this.dialogRef.close(data);
  }

}
