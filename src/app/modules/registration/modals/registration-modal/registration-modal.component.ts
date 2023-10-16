import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { debounceTime } from 'rxjs/operators';
import { RegistratioService } from '../../services/registratio.service';

@Component({
  selector: 'app-registration-modal',
  templateUrl: './registration-modal.component.html',
  styleUrls: ['./registration-modal.component.scss']
})
export class RegistrationModalComponent implements OnInit {

  registrationForm: FormGroup;
  isCreateMode: boolean;
  registrationData: any;
  idTypes: ['NID', 'PASSPORT', 'DRIVING_LICENCE', 'TRADE_LICENCE'];
  isIdNumberExist: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<RegistrationModalComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private registratioService: RegistratioService) { }

  ngOnInit(): void {
    this.initialIzeForm();
    this.checkUniqueIdentifier();
    this.checkUniqueIdNumber();
    this.isCreateMode = this.data.registrationData == undefined;
    this.registrationData = this.data.registrationData;
  }

  initialIzeForm() {
    this.registrationForm = this.fb.group({
      identifier: ['', Validators.required],
      firstName: [''],
      lastName : [''],
      idNumber: ['87345689', Validators.required],
      idType: ['NID'],
      customerId: [''],
      mobileNo: ['5656556', Validators.required],
      email: ['test@gmail.com'],
      area: ['Khulna'],
      region: ['Khulna'],
      territory: ['Khulna'],
      presentAddress: ['Khulna'],
      presentCity: ['Khulna'],
      presentUnion: ['Khulna'],
      presentThana: ['Khulna'],
      presentDistrict: ['Khulna'],
      presentCountry: ['Khulna'],
      permanentAddress: ['Khulna'],
      permanentCity: ['Khulna'],
      permanentUnion: ['Khulna'],
      permanentThana: ['Khulna'],
      permanentDistrict: ['Khulna'],
      permanentCountry: ['Khulna'],
      nomineeName: ['Rifat'],
      nomineeMobile: ['2452345632'],
      nomineeIdNumber: ['35635463'],
      nomineeIdType: ['NID'],
      nomineeAddress: ['Khulna'],
      nomineeRelation: ['Khulna'],
      status: ['PENDING'],
      alternativeAccountNumber: ["000000"]
    });
  }

  checkUniqueIdentifier(){
    this.registrationForm.get('identifier').valueChanges.pipe(debounceTime(800)).subscribe(
      data => {
        if (data)
          this.registratioService.checkUniqueidentifier(data).subscribe(isExist => {
            if(this.registrationForm.get('identifier').hasError('uniqueValueError')){
              delete this.registrationForm.get('identifier').errors['uniqueValueError'];
              this.registrationForm.get('identifier').updateValueAndValidity();
            }
            if(isExist){
              this.registrationForm.get('identifier').setErrors({uniqueValueError: true});
            }
          }, error => {
          });
      }
    )
  }

  checkUniqueIdNumber(){
    this.registrationForm.get('idNumber').valueChanges.pipe(debounceTime(800)).subscribe(
      data => {
        console.log('data :>> ', data);
        if (data)
          this.registratioService.checkUniqueIdNumber(data).subscribe(isExist => {
            console.log('isExist :>> ', isExist);
              this.isIdNumberExist = isExist;
          }, error => {
           // console.log('error :>> ', error);
          });
      }
    )
  }

  submit() {
    this.closeModal(this.registrationForm.value);
  }

  changeStatus(status){
    this.closeModal(status);
  }

  returnTitle() {
    if (this.isCreateMode)
      return "New Registration";
    else return "Change Status";
  }

  closeModal(data) {
    this.dialogRef.close(data);
  }

}
