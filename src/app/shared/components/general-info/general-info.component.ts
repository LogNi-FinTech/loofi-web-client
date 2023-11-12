import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewDetailComponent } from 'app/shared/modal/view-detail/view-detail.component';
import { TransactionService } from 'app/shared/service/transaction.service';
import { UserService } from 'app/shared/service/user.service';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent implements OnInit, OnDestroy {

  public isLoading: boolean = true;
  private identifier: string;
  public isXsStyleActive: boolean = false;
  public accountInfo: any;
  public balanceInfo: any;
  private _unsubscribe = new Subject();
  constructor(private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private dialog: MatDialog,
    private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.subscribeToGetAccountInformation();
    this.identifier =  this.userService.getIdentifier();
    this.subscribeToBreakPoint();
    this.getAccountInfo();
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  private subscribeToGetAccountInformation(){
    this.transactionService.getAccountInformation.pipe(takeUntil(this._unsubscribe)).subscribe(data=> {
      this.getAccountInfo();
    });
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

  private getAccountInfo(){
    this.userService.getAccountInfo(this.identifier).pipe(take(1)).subscribe(accountInfo => {
      this.accountInfo = accountInfo;
      this.getBalanceInfo();
    });
  }

  private getBalanceInfo(){
    this.userService.getBalanceInfo(this.identifier).pipe(take(1)).subscribe(balanceInfo => {
      this.balanceInfo = balanceInfo;
      this.isLoading = false;
    });
  }

  public openViewModal(){
    let subscribe = this.dialog.open(ViewDetailComponent, {
     // width: '550px',
      panelClass: ['app-full-bleed-dialog', 'general-info'],
      data: {
        balanceInfo: this.balanceInfo,
        accountInfo: this.accountInfo
      },
    });
    subscribe.afterClosed().subscribe(data=>{

    });
  }
}
