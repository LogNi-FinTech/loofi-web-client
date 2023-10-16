import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from 'app/shared/modals/confirm-delete/confirm-delete.component';
import { SnakBarService } from 'app/shared/service/snak-bar.service';
import { UserService } from 'app/shared/service/user.service';
import { CreateLoanApplicationComponent } from '../../modals/create-loan-application/create-loan-application.component';
import { CreateLoanComponent } from '../../modals/create-loan/create-loan.component';
import { LoanApplicationService } from '../../services/loan-application.service';
import { LoanProductService } from '../../services/loan-product.service';
import { LoanService } from '../../services/loan.service';

@Component({
  selector: 'app-loan-application',
  templateUrl: './loan-application.component.html',
  styleUrls: ['./loan-application.component.scss']
})
export class LoanApplicationComponent implements OnInit {

  public displayedColumns: string[] = ['name', 'loanAmount', 'period', 'status', 'loanDocument', 'approved'];
  public dataSource;
  public isLoading = false;

  constructor(private loanApplicationService: LoanApplicationService,
    private loanService : LoanService,
    public dialog: MatDialog, 
    private userService: UserService,
    private snakBarService: SnakBarService) { }

  ngOnInit(): void {
    console.log('this.UserService.ge :>> ', this.userService.userId + " " + this.userService.userRole);
    this.fetchLoanApplicationList();
  }

  openDialog(loanApplication?) {
    this.isLoading = true;
    let dialogRef = this.dialog.open(CreateLoanApplicationComponent, {
      width: '1090px',
      panelClass: 'app-full-bleed-dialog',
      data: {
        LoanApplicationData: loanApplication
      },
    });
    dialogRef.afterClosed().subscribe(modalLoanApplicationData => {
      debugger;
      if(modalLoanApplicationData){
        if (!loanApplication) {
          this.saveLoanApplication(modalLoanApplicationData);
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

  deleteModelOpen(loanApplicationId){
    this.isLoading = true;
    let dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '300px',
      panelClass: 'app-full-bleed-dialog',
    });
    dialogRef.afterClosed().subscribe(modalLoanApplicationData => {
      debugger;
      if(modalLoanApplicationData){
        console.log('data :>> ', loanApplicationId);
        this.deleteLoanApplication(loanApplicationId);
      }
      else {
        this.isLoading = false;
      }
    });
  }

  deleteLoanApplication(loanApplicationId){
    this.loanApplicationService.deleteLoanApplication(loanApplicationId).subscribe(data => {
      debugger;
      this.fetchLoanApplicationList();
      this.snakBarService.showMessage("Successfully Deleted");
    },
      error => {
        debugger;
        this.isLoading = false;
        this.snakBarService.showMessage("An error has occured");
      });
  }

  saveLoanApplication(modalLoanApplicationData){
    this.loanApplicationService.saveLoanApplication(modalLoanApplicationData).subscribe(async data => {
      this.fetchLoanApplicationList();
      this.snakBarService.showMessage("Successfully Saved");
    },
      error => {
        this.isLoading = false;
      });
    console.log('modalLoanApplicationData :>> ', modalLoanApplicationData);
  }

  fetchLoanApplicationList() {
    this.isLoading = true;
    this.loanApplicationService.fetchLoanApplications().subscribe(data => {
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

  downloadDocuments(loanApplication){
    if (loanApplication.loanDocument.documentFiles.length > 0){
      loanApplication.loanDocument.documentFiles.forEach(element => {
        this.loanApplicationService.downloadDocument(element.fileName).subscribe(data => {
          var fileURL = URL.createObjectURL(data);
    
          var a = document.createElement('a');
          a.href = fileURL;
          a.download = element.fileName;
          document.body.appendChild(a);
          a.click();
    
          setTimeout(function () {
            window.URL.revokeObjectURL(fileURL);
            a.remove();
          }, 100);
        });
      });
    }
    
  }

  approve(loanData){
    this.isLoading = true;
    let dialogRef = this.dialog.open(CreateLoanComponent, {
      width: '1090px',
      panelClass: 'app-full-bleed-dialog',
      data: {
        LoanData: loanData
      },
    });
    dialogRef.afterClosed().subscribe(modalLoanData => {
      if (modalLoanData) {
          modalLoanData = {
            loanApplication: {
              "id": loanData.id
            },
            "loanProduct": {
              "id": loanData.loanProduct.id
            },
            ...modalLoanData
          };
          debugger;
          this.saveLoan(modalLoanData);
        console.log('data :>> ', modalLoanData);
      }
      else {
        this.isLoading = false;
      }
    });
  }

  saveLoan(loanData) {
    this.loanService.saveLoan(loanData).subscribe(async data => {
      this.snakBarService.showMessage("Successfully Saved");
      this.isLoading = false;
    },
      error => {
        this.isLoading = false;
      });
    console.log('modalLoanApplicationData :>> ', loanData);
  }
}
