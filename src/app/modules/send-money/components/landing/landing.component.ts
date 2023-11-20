import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { BackMessage, OperatorTypes, TransactionType, TxnCode } from 'app/shared/constant/constant';
import { SnakBarService } from 'app/shared/service/snak-bar.service';
import { TransactionService } from 'app/shared/service/transaction.service';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
//import { ToastsManager } from 'ng2-toastr/ng2-toastr';

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
  public messageInfo: any = {
    txnId: "",
    status:"",
    amount: 0
  };
  public showSuccessMessage = false;
  public successMessageInfo;
  constructor(private breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private transactionService: TransactionService,
    private authService: AuthService,
    private snakBarService: SnakBarService,
    private router: Router) {
     }

  ngOnInit(): void {
    this.initializeForm();
    this.subscribeToBreakPoint();
  }

  private initializeForm(){
    this.mobileRecharge = this.formBuilder.group({
      toAc: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      note: [''],
    });
  }

  public onSubmit() {
    if (!this.mobileRecharge.valid) {
      //this.mobileRecharge.markAsTouched();
      this.mobileRecharge.get("toAc").markAsTouched();
      this.mobileRecharge.get("amount").markAsTouched();
      return;
    }

    this.isLoading = true;
    const parameterValue = this.getParameterValue();
    this.transactionService.doTransaction(this.transactionService.getTransactionPayload(parameterValue)).pipe(take(1)).subscribe(data=>{
      this.isLoading = false;
      this.successMessageInfo = this.getMessageInfoData(data);
      this.showSuccessMessage = true;
      this.transactionService.getAccountInformation.next();
      //this.mobileRecharge.reset();
    },
    error => {
      console.log('error :>> ', error);
      this.isLoading = false;
      this.snakBarService.showToasterError(error.error.message)
    });
  }

  private getParameterValue(){
    const identifier = this.authService.userIdentifier;
    const formValue = this.mobileRecharge.getRawValue();
    const txnCode = TxnCode.SendMoney;
    return {
      identifier,
      ...formValue,
      txnCode
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

  private getMessageInfoData(data: any){
    return {
      amount: this.mobileRecharge.getRawValue().amount,
      status: data.status,
      txnId: data.txnId,
      transactionType: TransactionType.SendMoney
    }
  }

  public receiveMessage(message: string) {
    this.showSuccessMessage = false;
    this.mobileRecharge.reset();
    if(message == BackMessage.Home){
      this.router.navigate(['/home'])
    }
  }

}
