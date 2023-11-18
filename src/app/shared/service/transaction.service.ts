import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { accountServiceBaseUrl } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  public getAccountInformation = new Subject();
  private mobileRechargeUrl = accountServiceBaseUrl + "api/v1/txn";
  private transactionUrl = accountServiceBaseUrl + "api/v1/txn";

  constructor(private _httpClient: HttpClient) { }

  public mobileRecharge(payload): Observable<any>{
    return this._httpClient.post<any>(this.mobileRechargeUrl, payload, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', }),
    });
  }

  public doTransaction(payload): Observable<any>{
    return this._httpClient.post<any>(this.transactionUrl, payload, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', }),
    });
  }

  public getTransactionPayload({identifier, toAc, amount, note, txnCode, referenceId = "6411-AZOM"}:
    {identifier: string, toAc: string, amount: number, note: string, txnCode:string, referenceId?: string}){
    return {
      "fromAc": identifier,
      "toAc": toAc,
      "amount": amount,
      "transactionType": {"txnCode": txnCode},
      "note": note,
      "referenceId": referenceId,
      "tag": "TEST",
      "data": {"reason": "Joma"},
      "description": " ",
      "channel": "REST",
      "requestId": "3886735",
      "maker": "TEST",
      "checker": "TEST"
    };
  }
}
