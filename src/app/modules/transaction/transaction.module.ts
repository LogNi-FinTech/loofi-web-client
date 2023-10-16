import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionComponent } from './Components/transaction/transaction.component';
import { Route, RouterModule } from '@angular/router';
import { CreateMfsLedgerTransactionComponent } from './modal/create-mfs-ledger-transaction/create-mfs-ledger-transaction.component';
import { SharedModule } from 'app/shared/shared.module';


export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', component: TransactionComponent },
];

@NgModule({
  declarations: [
    TransactionComponent,
    CreateMfsLedgerTransactionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    SharedModule
  ],
  entryComponents: [CreateMfsLedgerTransactionComponent]
})
export class TransactionModule { }
