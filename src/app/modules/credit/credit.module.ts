import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanProductComponent } from './components/loan-product/loan-product.component';
import { CreateLoanProductComponent } from './modals/create-loan-product/create-loan-product.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { ConfirmDeleteComponent } from '../../shared/modals/confirm-delete/confirm-delete.component';
import { LoanApplicationComponent } from './components/loan-application/loan-application.component';
import { CreateLoanApplicationComponent } from './modals/create-loan-application/create-loan-application.component';
import { CreateLoanComponent } from './modals/create-loan/create-loan.component';
import { LoanComponent } from './components/loan/loan.component';
import { LoanRepaymentListComponent } from './modals/loan-repayment-list/loan-repayment-list.component';
import { LoanRepaymentComponent } from './modals/loan-repayment/loan-repayment.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: "loan-product-list" },
  { path: 'loan-products', pathMatch: 'full', component: LoanProductComponent },
  { path: 'loan-applications', pathMatch: 'full', component: LoanApplicationComponent },
  { path: 'loans', pathMatch: 'full', component: LoanComponent }
];


@NgModule({
  declarations: [
    LoanProductComponent,
    CreateLoanProductComponent,
    ConfirmDeleteComponent,
    LoanApplicationComponent,
    CreateLoanApplicationComponent,
    CreateLoanComponent,
    LoanComponent,
    LoanRepaymentListComponent,
    LoanRepaymentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  entryComponents: [CreateLoanProductComponent, ConfirmDeleteComponent, CreateLoanApplicationComponent, CreateLoanComponent, LoanRepaymentListComponent]
})
export class CreditModule { }
