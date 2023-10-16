import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnakBarService } from 'app/shared/service/snak-bar.service';
import { UserService } from 'app/shared/service/user.service';
import { ConfirmDeleteComponent } from '../../../../shared/modals/confirm-delete/confirm-delete.component';
import { CreateLoanProductComponent } from '../../modals/create-loan-product/create-loan-product.component';
import { LoanProductService } from '../../services/loan-product.service';

@Component({
  selector: 'app-loan-product',
  templateUrl: './loan-product.component.html',
  styleUrls: ['./loan-product.component.scss']
})
export class LoanProductComponent implements OnInit {

  public displayedColumns: string[] = ['name', 'interestRate', 'loanFee', 'maxAmount', 'minAmount', 'minPeriod', 'maxPeriod', 'delete'];
  public dataSource;
  public isLoading = false;

  constructor(private loanProductService: LoanProductService,
    public dialog: MatDialog,
    private userService: UserService,
    private snakBarService: SnakBarService) { }

  ngOnInit(): void {
    console.log('this.UserService.ge :>> ', this.userService.userId + " " + this.userService.userRole);
    this.fetchLoanProductList();
  }

  openDialog(loanProduct?) {
    this.isLoading = true;
    let dialogRef = this.dialog.open(CreateLoanProductComponent, {
      width: '1090px',
      panelClass: 'app-full-bleed-dialog',
      data: {
        LoanProductData: loanProduct
      },
    });
    dialogRef.afterClosed().subscribe(modalLoanProductData => {
      debugger;
      if(modalLoanProductData){
        if (!loanProduct) {
          this.saveLoanProduct(modalLoanProductData);
        }
        else {
          this.isLoading = false;
        }
      }
      else {
        this.isLoading = false;
      }
    });
  }

  deleteModelOpen(loanProductId){
    this.isLoading = true;
    let dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '300px',
      panelClass: 'app-full-bleed-dialog',
    });
    dialogRef.afterClosed().subscribe(modalLoanProductData => {
      debugger;
      if(modalLoanProductData){
        console.log('data :>> ', loanProductId);
        this.deleteLoanProduct(loanProductId);
      }
      else {
        this.isLoading = false;
      }
    });
  }

  deleteLoanProduct(loanProductId){
    this.loanProductService.deleteLoanProduct(loanProductId).subscribe(data => {
      debugger;
      this.fetchLoanProductList();
      this.snakBarService.showMessage("Successfully Deleted");
    },
      error => {
        debugger;
        this.isLoading = false;
        this.snakBarService.showMessage("An error has occured");
      });
  }

  saveLoanProduct(modalLoanProductData){
    this.loanProductService.saveLoanProduct(modalLoanProductData).subscribe(async data => {
      this.fetchLoanProductList();
      this.snakBarService.showMessage("Successfully Saved");
    },
      error => {
        this.isLoading = false;
      });
    console.log('modalLoanProductData :>> ', modalLoanProductData);
  }

  fetchLoanProductList() {
    this.isLoading = true;
    this.loanProductService.fetchLoanProductList().subscribe(data => {
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
