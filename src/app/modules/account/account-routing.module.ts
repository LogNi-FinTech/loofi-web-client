import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountBalanceComponent } from './components/account-Balance/accountBalance.component';
import { AccountIdentiferComponent } from './components/account-Identifier/accountIdentifier.component';
import { AccountCreateComponent } from './components/account/account.component';
import { AccountStatementComponent } from './components/accountStatement/accountStatement.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: "create"},
  { path: 'create', pathMatch: 'full', component: AccountCreateComponent },
  { path: 'detail', component: AccountIdentiferComponent }, 
  { path: 'balance', component: AccountBalanceComponent },
  { path: 'statement', component: AccountStatementComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
