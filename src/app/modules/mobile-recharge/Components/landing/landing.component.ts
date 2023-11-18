import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/core/auth/auth.service';
import { MerchantAccount, OperatorTypes, TxnCode } from 'app/shared/constant/constant';
import { SnakBarService } from 'app/shared/service/snak-bar.service';
import { TransactionService } from 'app/shared/service/transaction.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  public operatorTypes = OperatorTypes;
  public mobileRecharge: FormGroup;
  public isXsStyleActive: boolean = false;
  public isLoading: boolean = false;
  constructor(private breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private transactionService: TransactionService,
    private snackBar: SnakBarService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.subscribeToBreakPoint();
  }

  private initializeForm(){
    this.mobileRecharge = this.formBuilder.group({
      referenceId: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      accountType: [''],
      operatorType: ['Airtel', [Validators.required]],
    });
  }

  public onSubmit() {
    if (!this.mobileRecharge.valid) {
      //this.mobileRecharge.markAsTouched();
      this.mobileRecharge.get("referenceId").markAsTouched();  // 01674242921
      this.mobileRecharge.get("amount").markAsTouched();
      return;
    }

    this.isLoading = true;
    const parameterValue = this.getParameterValue();
    this.transactionService.mobileRecharge(this.transactionService.getTransactionPayload(parameterValue)).pipe(take(1)).subscribe(data=>{
      this.snackBar.showMessage("Successfully Recharged", 2000);
      this.transactionService.getAccountInformation.next();
      this.isLoading = false;
      this.mobileRecharge.reset();
    })
  }
  
  private getParameterValue(){
    const identifier = this.authService.userIdentifier;
    const formValue = this.mobileRecharge.getRawValue();
    const txnCode = TxnCode.MobileRecharge;
    const toAc = MerchantAccount;
    return {
      identifier,
      ...formValue,
      txnCode,
      toAc
    }
  }


  private subscribeToBreakPoint(){
    this.breakpointObserver
    .observe([Breakpoints.XSmall])
    .pipe()
    .subscribe((result) => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.isXsStyleActive = true;
          console.log('XSmall screen detected');
          return;
        }
      }
      this.isXsStyleActive = false;
    });
  }

  public changeOperator(index){
    this.operatorTypes.forEach((item)=>{
      item.isSelected = false;
    });
    this.operatorTypes[index].isSelected = true;
    this.mobileRecharge.get("operatorType").setValue(this.operatorTypes[index].name);
  }

}
