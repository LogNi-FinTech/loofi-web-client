import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { AccountCreateComponent } from './components/account/account.component';
import { AccountBalanceComponent } from './components/account-Balance/accountBalance.component';
import { AccountIdentiferComponent } from './components/account-Identifier/accountIdentifier.component';
import { AccountStatementComponent } from './components/accountStatement/accountStatement.component';


@NgModule({
  declarations: [
    AccountCreateComponent,
    AccountBalanceComponent,
    AccountIdentiferComponent,
    AccountStatementComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule
  ]
})
export class AccountModule { }
