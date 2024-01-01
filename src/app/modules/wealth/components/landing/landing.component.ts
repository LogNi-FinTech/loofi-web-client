import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WealthService } from '../../Service/wealth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  public filterTransactions = [
    {
      viewValue: "Deposit",
      value: 1
    },
    {
      viewValue: "Stock",
      value: 2
    }
  ];
  public isXsStyleActive: boolean = false;
  public wealths: any[];
  public accountInfo: any;
  public balanceInfo: any;
  public isLoading: boolean = true;
  filterTransaction : FormGroup;

  constructor(private breakpointObserver: BreakpointObserver,
    private wealthService : WealthService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.subscribeToBreakPoint();
    this.wealths = this.wealthService.gerWealths();
  }

  initializeForm(){
    this.filterTransaction = new FormGroup({
      filterTransactionControl: new FormControl(this.filterTransactions[0])
    })
  }

  subscribeToBreakPoint(){
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

  compareByValue(option1, option2) {
    return option1.value === option2.value;
  }

}
