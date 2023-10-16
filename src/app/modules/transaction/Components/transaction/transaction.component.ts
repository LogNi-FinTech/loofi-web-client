import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { SnakBarService } from 'app/shared/service/snak-bar.service';
import { UserService } from 'app/shared/service/user.service';
import { CreateMfsLedgerTransactionComponent } from '../../modal/create-mfs-ledger-transaction/create-mfs-ledger-transaction.component';
import { MfsLedgerTransaction } from '../../model/MfsLedgerTransaction';
import { TransactionService } from '../../Service/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  public displayedColumns: string[] = ['amount', 'fromAC', 'toAc', 'txnTime', 'lastModifiedDate', 'status', 'txnId'];
  public dataSource;
  public isLoading = false;

  constructor(private transactionService: TransactionService,
    public dialog: MatDialog,
    private userService: UserService,
    private snakBarService: SnakBarService) { }

  ngOnInit(): void {
    this.isLoading = true;
    console.log('this.UserService.ge :>> ', this.userService.userId + " " + this.userService.userRole);
    setTimeout(() => {
      this.fetchMfsLedgerTransaction();
    }, 2000)
  }



  changeStatusMfsLedgerTransaction(mfsLedgerTransaction) {
    this.isLoading = true;
    let payload: MfsLedgerTransaction = {
      id: mfsLedgerTransaction.id,
      checker_id: Number(this.userService.userId)
    }
    this.transactionService.changeStatusMfsLedgerTransaction(payload).subscribe(async data => {
      await this.fetchMfsLedgerTransaction();
      this.snakBarService.showMessage("Approved");
    },
      error => {
        this.snakBarService.showMessage("An error has occured");
        this.isLoading = false;
      });
  }

  openDialog(transactionType) {
    this.isLoading = true;
    let dialogRef = this.dialog.open(CreateMfsLedgerTransactionComponent, {
      width: '480px',
      panelClass: 'app-full-bleed-dialog',
      data: {
        TransactionType: transactionType
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      debugger;
      if (result != null) {
        result = {
          ...result,
          maker_id: Number(this.userService.userId),
          txnTime: new Date().toISOString(),
          transactionType: transactionType,
          status: "PENDING",
          branch: "Branch"
        }
        console.log('result :>> ', result);
        this.transactionService.saveTransaction(result).subscribe(async data => {
          await this.fetchMfsLedgerTransaction();
          this.snakBarService.showMessage("Successfully Saved");
        },
          error => {
            this.isLoading = false;
          });
        console.log('result :>> ', result);
      }
      else {
        this.isLoading = false;
      }
    });
  }

  fetchMfsLedgerTransaction() {
    this.transactionService.fetchMfsLedgerTransaction().subscribe(data => {
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
}

const ELEMENT_DATA: MfsLedgerTransaction[] = [
  { id: 1, amount: 12000, status: "Pending", branch: 'Dhaka', txnTime: "Fri Sep 30 2022 02:48:39 GMT-0700", fromAC: "9475738", toAc: "9475738" },
  { id: 1, amount: 12000, status: "Pending", branch: 'Dhaka', txnTime: "Fri Sep 30 2022 02:48:39 GMT-0700", fromAC: "9475738", toAc: "9475738" },
  { id: 1, amount: 12000, status: "Accepted", branch: 'Khulna', txnTime: "Fri Sep 30 2022 02:48:39 GMT-0700", fromAC: "9475738", toAc: "9475738" },
  { id: 1, amount: 12000, status: "Pending", branch: 'Dhaka', txnTime: "Fri Sep 30 2022 02:48:39 GMT-0700", fromAC: "9475738", toAc: "9475738" },
  { id: 1, amount: 12000, status: "Pending", branch: 'Dhaka', txnTime: "Fri Sep 30 2022 02:48:39 GMT-0700", fromAC: "9475738", toAc: "9475738" },
  { id: 1, amount: 12000, status: "Pending", branch: 'Khulna', txnTime: "Fri Sep 30 2022 02:48:39 GMT-0700", fromAC: "9475738", toAc: "9475738" },
  { id: 1, amount: 12000, status: "Pending", branch: 'Khulna', txnTime: "Fri Sep 30 2022 02:48:39 GMT-0700", fromAC: "9475738", toAc: "9475738" },
  { id: 1, amount: 12000, status: "Pending", branch: 'Khulna', txnTime: "Fri Sep 30 2022 02:48:39 GMT-0700", fromAC: "9475738", toAc: "9475738" },
];


