import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnakBarService } from 'app/shared/service/snak-bar.service';
import { UserService } from 'app/shared/service/user.service';
import { LoanRepaymentService } from '../../services/loan-repayment.service';
import { LoanService } from '../../services/loan.service';
import { LoanRepaymentComponent } from '../loan-repayment/loan-repayment.component';

@Component({
  selector: 'app-loan-repayment-list',
  templateUrl: './loan-repayment-list.component.html',
  styleUrls: ['./loan-repayment-list.component.scss']
})
export class LoanRepaymentListComponent implements OnInit {

  public displayedColumns: string[] = ['txnId', 'principleAmount', 'interestAmount', 'unPaidPrincipleAmount', 'unPaidInterestAmount', 'status', 'payment', 'partialPayment'];
  public dataSource;
  public isLoading = false;

  constructor(
    private loanService : LoanService,
    public dialog: MatDialog, 
    private userService: UserService,
    private snakBarService: SnakBarService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loanRepaymentService: LoanRepaymentService) { }

  ngOnInit(): void {
    this.fetchLoanRepaymentList();
  }

  fetchLoanRepaymentList() {
    this.isLoading = true;
    this.loanService.fetchLoanRepaymentList(this.data.LoanId).subscribe(data => {
      debugger;
      this.dataSource = data;
      this.isLoading = false;
      console.log('data :>> ', data);
    },
      error => {
        this.isLoading = false;
        this.snakBarService.showMessage("An error has occured");
      });
  }

  payment(paymentData, paidSatatus){
   
    console.log('data :>> ', paymentData);
    debugger;
    const dialogData = {
      ...paymentData,
      isPartialPayment: paidSatatus == 'PARTIAL_PAID'
    }
    let dialogRef = this.dialog.open(LoanRepaymentComponent, {
      width: '480px',
      panelClass: 'app-full-bleed-dialog',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(modalLoanPaymentData => {
      debugger;
      if (modalLoanPaymentData) {
        this.isLoading = true;
        paymentData = {
          ...paymentData,
          ...modalLoanPaymentData,
          status: paidSatatus
        };
        this.loanRepaymentService.partialPayment(paymentData).subscribe(data=> {
          this.fetchLoanRepaymentList();
        }, 
        error=> {
          this.snakBarService.showMessage("An error has occured");
        })
      }
      else {
        this.isLoading = false;
      }
    });
  }

}

