import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { BackMessage, OperatorTypes, TransactionType, TxnCode } from 'app/shared/constant/constant';
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
  public formGroup: FormGroup;
  public isXsStyleActive: boolean = false;
  public isLoading: boolean = false;
  public successMessageInfo;
  public showSuccessMessage = false;
  constructor(private breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private transactionService: TransactionService,
    private authService: AuthService,
    private router: Router,
    private snakBarService: SnakBarService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.subscribeToBreakPoint();
  }

  private initializeForm(){
    this.formGroup = this.formBuilder.group({
      toAc: ['', [Validators.required]],   // 01674242921
      amount: ['', [Validators.required]],
      note: [''],
    });
  }

  public onSubmit() {
    if (!this.formGroup.valid) {
      //this.formGroup.markAsTouched();
      this.formGroup.get("toAc").markAsTouched();
      this.formGroup.get("amount").markAsTouched();
      return;
    }

    this.isLoading = true;
    const parameterValue = this.getParameterValue();
    this.transactionService.doTransaction(this.transactionService.getTransactionPayload(parameterValue)).pipe(take(1)).subscribe(data=>{
      this.isLoading = false;
      this.successMessageInfo = this.getMessageInfoData(data);
      this.showSuccessMessage = true;
      this.transactionService.getAccountInformation.next();
      this.formGroup.reset();
    },
    error => {
      console.log('error :>> ', error);
      this.isLoading = false;
      this.snakBarService.showToasterError(error.error.message)
    });
  }

  private getMessageInfoData(data: any){
    return {
      amount: this.formGroup.getRawValue().amount,
      status: data.status,
      txnId: data.txnId,
      transactionType: TransactionType.Payment
    }
  }

  public receiveMessage(message: string) {
    this.showSuccessMessage = false;
    this.formGroup.reset();
    if(message == BackMessage.Home){
      this.router.navigate(['/home'])
    }
  }

  private getParameterValue(){
    const identifier = this.authService.userIdentifier;
    const formValue = this.formGroup.getRawValue();
    const txnCode = TxnCode.Payment;
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

}
