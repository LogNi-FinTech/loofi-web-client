import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnakBarService } from 'app/shared/service/snak-bar.service';
import { loanApplicationStatus } from '../../constants/loan-constant';
import { LoanProductService } from '../../services/loan-product.service';

@Component({
  selector: 'app-create-loan-application',
  templateUrl: './create-loan-application.component.html',
  styleUrls: ['./create-loan-application.component.scss']
})
export class CreateLoanApplicationComponent implements OnInit {

  loanApplicationForm: FormGroup;
  isCreateMode: boolean;
  loanApplicationData: any;
  isIdNumberExist: boolean = false;
  loanApplicationStatus = loanApplicationStatus;
  loanProducts: any[];
  userInfo;
  isLoading = false;
 
  documents: any = File;
  fileSelected = false;
  userInfoShow = false;

  constructor(
    public dialogRef: MatDialogRef<CreateLoanApplicationComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loanProductService: LoanProductService,
    private snakBarService: SnakBarService) {
     }

  ngOnInit(): void {
    this.initialIzeForm();
    this.fetchLoanProductList();
    this.isCreateMode = this.data.loanApplicationData == undefined;
    this.loanApplicationData = this.data.loanApplicationData;
  }

  initialIzeForm() {
    this.loanApplicationForm = this.fb.group({
      name: ['loan 1'],
      loanAmount: ['1100'],
      period : ['4'],
      description: ['description'],
      loanProductId: ['', Validators.required],
      customerId: ['', Validators.required],
      searchBy: ['Mobile'],
      CustomerSearch: ['']
    });
  }

  onSelectFile(event){
    this.fileSelected = true;
    this.documents = event.target.files;
  }

  submit() {
    debugger
    if (this.loanApplicationForm.valid) {
      let formdata = new FormData();
      let data = this.loanApplicationForm.value;
      delete data.CustomerSearch;
      delete data.searchBy;
      formdata.append('application-object', JSON.stringify(this.loanApplicationForm.value));
      if (this.fileSelected) {
        for (let i = 0; i < this.documents.length; i++)
          formdata.append('document', this.documents[i]);
      }
      this.closeModal(formdata);
    }
    else {
      this.loanApplicationForm.markAllAsTouched();
    }
  }

  search(){
    this.isLoading = true;
    this.userInfoShow = true;
    if(this.loanApplicationForm.get('searchBy').value == 'Mobile'){
      this.loanProductService.fetchCustomerByMobile(this.loanApplicationForm.get('CustomerSearch').value).subscribe(data => {
        this.userInfo = data;
        this.updateCustomerId();
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
      });
    }
    else {
      this.loanProductService.fetchCustomerById(this.loanApplicationForm.get('CustomerSearch').value).subscribe(data => {
        this.userInfo = data;
        this.isLoading = false;
        this.updateCustomerId();
      },
      error => {
        this.isLoading = false;
      });
    }
  }

  updateCustomerId(){
    if(this.userInfo){
      this.loanApplicationForm.get('customerId').setValue(this.userInfo.id);
    }
    else {
      this.loanApplicationForm.get('customerId').setValue('');
    }
  }

  changeStatus(status){
    this.closeModal(status);
  }

  returnTitle() {
    if (this.isCreateMode)
      return "New Loan-Application";
    else return "Change Status";
  }

  closeModal(data) {
    this.dialogRef.close(data);
  }

  fetchLoanProductList() {
    this.loanProductService.fetchLoanProductList().subscribe(data => {
      debugger;
      this.loanProducts = data;
      console.log('data :>> ', data);
    },
      error => {
        this.snakBarService.showMessage("An error has occured");
      });
  }
}
