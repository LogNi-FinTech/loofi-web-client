import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OperatorTypes } from 'app/shared/constant/constant';
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
    private snackBar: SnakBarService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.subscribeToBreakPoint();
  }

  private initializeForm(){
    this.mobileRecharge = this.formBuilder.group({
      number: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      accountType: [''],
      operatorType: ['Airtel', [Validators.required]],
    });
  }

  public onSubmit() {
    debugger;
    if (!this.mobileRecharge.valid) {
      //this.mobileRecharge.markAsTouched();
      this.mobileRecharge.get("number").markAsTouched();
      this.mobileRecharge.get("amount").markAsTouched();
      return;
    }

    this.isLoading = true;
    this.transactionService.mobileRecharge(this.mobileRecharge.getRawValue()).pipe(take(1)).subscribe(data=>{
      this.snackBar.showMessage("Successfully recharged");
      this.isLoading = false;
    })
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
