import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HomeService } from 'app/modules/home/services/home.service';
import { UserService } from 'app/shared/service/user.service';
import { take } from 'rxjs/operators';

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
  filterTransaction : FormGroup;
  public transactions: any[];
  public storedTransactions: any[];
  private identifier: string;
  public accountInfo: any;
  public balanceInfo: any;
  public isLoading: boolean = true;

  constructor(private breakpointObserver: BreakpointObserver,
    private homeService: HomeService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.identifier =  this.userService.getIdentifier();
    this.initializeForm();
    this.subscribeToBreakPoint();
    this.getTransactions();
    setTimeout(() => {
      this.filterTransaction.get("filterTransactionControl").valueChanges.subscribe((data) => {
        console.log('Selected Value:', data);
        if(data.value == 1){
          this.transactions = this.storedTransactions; 
          return;
        }
        else if(data.value == 2){
          this.transactions = this.storedTransactions.filter(item => !item.MoneyDirection); 
          return;
        }
        this.transactions = this.storedTransactions.filter(item => item.MoneyDirection); 
      });
    });
  }

  // getAccountInfo(){
  //   this.homeService.getAccountInfo(this.identifier).pipe(take(1)).subscribe(accountInfo => {
  //     this.accountInfo = accountInfo;
  //     this.getBalanceInfo();
  //   })
  // }

  // getBalanceInfo(){
  //   this.homeService.getBalanceInfo(this.identifier).pipe(take(1)).subscribe(balanceInfo => {
  //     this.balanceInfo = balanceInfo;
  //     this.getTransactions();
  //   });
  // }
  
  private getTransactions(){
    this.homeService.getTransactions(this.identifier).pipe(take(1)).subscribe(transactions => {
      this.transactions = this.formatTransactions(transactions.content)
      this.isLoading = false;
      this.storedTransactions = this.transactions;
    });
    //this.transactions = this.formatTransactionDates(this.homeService.getTransActionData());
  }

  private formatTransactions(transactions: any[]): any[] {
    return transactions.map((transaction) => ({
      ...transaction,
      image: '1.jpg',
      MoneyDirection: transaction.amount > 0 ? true : false,
      amount: transaction.amount < 0 ? transaction.amount * -1 : transaction.amount, 
      formattedDate: transaction.txnTime,
    }));
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
