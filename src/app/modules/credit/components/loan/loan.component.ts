import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnakBarService } from 'app/shared/service/snak-bar.service';
import { UserService } from 'app/shared/service/user.service';
import { LoanRepaymentListComponent } from '../../modals/loan-repayment-list/loan-repayment-list.component';
import { LoanService } from '../../services/loan.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {

  public displayedColumns: string[] = ['loanStatus', 'frequency', 'noOfInstallment', 'principleAmount', 'interestAmount', 'unpaidPrincipleAmount', 'unpaidInterestAmount', 'repayment'];
  public dataSource;
  public isLoading = false;

  constructor(
    private loanService : LoanService,
    public dialog: MatDialog, 
    private userService: UserService,
    private snakBarService: SnakBarService) { }

  ngOnInit(): void {
    this.fetchLoanList();
  }

  fetchLoanList() {
    this.isLoading = true;
    this.loanService.fetchLoanList().subscribe(data => {
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

  repaymentFun(loanData){
    let dialogRef = this.dialog.open(LoanRepaymentListComponent, {
      width: '1090px',
      panelClass: 'app-full-bleed-dialog',
      data: {
        LoanId: loanData.id
      },
    });
    dialogRef.afterClosed().subscribe(modalLoanData => {
      this.isLoading = true;
      this.fetchLoanList();
    });
  }

}
