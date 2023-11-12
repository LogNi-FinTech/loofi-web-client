import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'app/core/auth/auth.service';
import { SuccessMessageComponent } from 'app/shared/components/success-message/success-message.component';
import { OperatorTypes, TransactionType, TxnCode } from 'app/shared/constant/constant';
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
  constructor(private breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private transactionService: TransactionService,
    private snackBar: SnakBarService,
    private authService: AuthService,
    private dialog: MatDialog,
    private toastr: ToastrService,) {
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
    debugger;
    if (!this.mobileRecharge.valid) {
      //this.mobileRecharge.markAsTouched();
      this.mobileRecharge.get("toAc").markAsTouched();
      this.mobileRecharge.get("amount").markAsTouched();
      return;
    }

    this.isLoading = true;
    const parameterValue = this.getParameterValue();
    this.transactionService.doTransaction(this.transactionService.getTransactionPayload(parameterValue)).pipe(take(1)).subscribe(data=>{
      debugger;
      this.isLoading = false;
      this.openViewModal(this.getMessageInfoData(data));
      this.transactionService.getAccountInformation.next();
      //this.mobileRecharge.reset();
    },
    error => {
      console.log('error :>> ', error);
      this.isLoading = false;
      this.showToasterError(error.error.message)
    })
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

  public openViewModal(messageInfo){
    let subscribe = this.dialog.open(SuccessMessageComponent, {
     // width: '550px',
      panelClass: 'app-full-bleed-dialog',
      data: {
        messageInfo: messageInfo
      },
    });
    subscribe.afterClosed().subscribe(data=>{

    });
  }

  showToasterError(errorMessage){
    this.toastr.error("", errorMessage,  { timeOut: 3000, closeButton: true,})
  }
}
