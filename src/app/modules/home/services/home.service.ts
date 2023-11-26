import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { accountServiceBaseUrl } from 'app/shared/constant/constant';

@Injectable()
export class HomeService {

  private getAccountInfoUrl = accountServiceBaseUrl + "api/v1/account/"
  private getBalanceInfoUrl = accountServiceBaseUrl + "api/v1/account/balance/"
  private getTransactionsUrl = accountServiceBaseUrl + "api/v1/account/statement?account="
  
  constructor(private _httpClient: HttpClient) { }

  // public getAccountInfo(identifier: string){
  //   return this._httpClient.get<any>(this.getAccountInfoUrl+identifier, {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json', }),
  //   });
  // }

  // public getBalanceInfo(identifier: string){
  //   return this._httpClient.get<any>(this.getBalanceInfoUrl+identifier, {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json', }),
  //   });
  // }

  public getTransactions(identifier: string){
    return this._httpClient.get<any>(this.getTransactionsUrl+identifier+"&pageNumber=0&size=50&sort=txnTime,desc", {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', }),
    });
  }
}
