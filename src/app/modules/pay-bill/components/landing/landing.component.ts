import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/core/auth/auth.service';
import { OperatorTypes, TxnCode } from 'app/shared/constant/constant';
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
      this.snackBar.showMessage("Successfully Paid", 2000);
      this.isLoading = false;
      this.transactionService.getAccountInformation.next();
      this.formGroup.reset();
    })
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
