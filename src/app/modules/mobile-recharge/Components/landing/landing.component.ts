import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OperatorTypes } from 'app/shared/constant/constant';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  public operatorTypes = OperatorTypes;
  public mobileRecharge: FormGroup;
  public isXsStyleActive: boolean = false;
  constructor(private breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
    this.subscribeToBreakPoint();
  }

  private initializeForm(){
    this.mobileRecharge = this.formBuilder.group({
      number: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      accountType: ['', [Validators.required]],
      operatorType: ['', [Validators.required]],
    });
  }

  public onSubmit() {
    if (this.mobileRecharge.valid) {
      // Form is valid, handle the submission
      console.log(this.mobileRecharge.value);
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
  }

}
