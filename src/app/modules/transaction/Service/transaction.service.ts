import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MfsLedgerTransaction } from '../model/MfsLedgerTransaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private baseurl = "http://localhost:8080/api";
  private fetchMfsTransactionUrl = this.baseurl + "/ledger-transaction";
  private saveMfsTransaction = this.baseurl + "/ledger-transaction";
  private changeStatusMfsLedgerTransactionUrl = this.baseurl + "/ledger-transaction/checker/change-status";

  constructor(private _httpClient: HttpClient) { }

  fetchMfsLedgerTransaction():Observable<MfsLedgerTransaction[]>{
    return this._httpClient.get<MfsLedgerTransaction[]>(this.fetchMfsTransactionUrl, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', }),
    });
  }

  saveTransaction(transaction: MfsLedgerTransaction){
    return this._httpClient.post(this.saveMfsTransaction, transaction);
  }

  changeStatusMfsLedgerTransaction(transaction: MfsLedgerTransaction){
    return this._httpClient.post(this.changeStatusMfsLedgerTransactionUrl, transaction);
  }
}
