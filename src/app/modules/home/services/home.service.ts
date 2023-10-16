import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { accountServiceBaseUrl } from 'app/shared/constant/baseUrl';

@Injectable()
export class HomeService {

  private getAccountInfoUrl = accountServiceBaseUrl + "api/v1/account/"
  private getBalanceInfoUrl = accountServiceBaseUrl + "api/v1/account/balance/"
  private getTransactionsUrl = accountServiceBaseUrl + "api/v1/account/statement?account="
  
  constructor(private _httpClient: HttpClient) { }

  public getAccountInfo(identifier: string){
    return this._httpClient.get<any>(this.getAccountInfoUrl+identifier, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', }),
    });
  }

  public getBalanceInfo(identifier: string){
    return this._httpClient.get<any>(this.getBalanceInfoUrl+identifier, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', }),
    });
  }

  public getTransactions(identifier: string){
    return this._httpClient.get<any>(this.getTransactionsUrl+identifier, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', }),
    });
  }

  getTransActionData(){
    return [
      {
        Amount: 4215200,
        TransActionId: "23ASJHUR",
        Type: "Send Money",
        Account: "23845850",
        Date: new Date(),
        image: "1.jpg",
        MoneyDirection: false
      },
      {
        Amount: 100,
        TransActionId: "EWASJHUR",
        Type: "Mobile Recharge",
        Account: "0174589745",
        Date: new Date(),
        image: "2.png",
        MoneyDirection: false
      },
      {
        Amount: 15000,
        TransActionId: "JIIOUHG",
        Type: "Payment",
        Account: "0198746322",
        Date: new Date(),
        image: "3.jpg",
        MoneyDirection: false
      },
      {
        Amount: 14200,
        TransActionId: "JSHQY733",
        Type: "Add Money",
        Account: "986754657",
        Date: new Date(),
        image: "4.png",
        MoneyDirection: true
      },
      {
        Amount: 159900,
        TransActionId: "POUINJJ34",
        Type: "Bank Transfer",
        Account: "456777",
        Date: new Date(),
        image: "1.jpg",
        MoneyDirection: false
      },  
      {
        Amount: 78000,
        TransActionId: "MLPIYH12",
        Type: "Pay Bill",
        Account: "0187456542",
        Date: new Date(),
        image: "3.jpg",
        MoneyDirection: false
      }, 
      {
        Amount: 100,
        TransActionId: "EWASJHUR",
        Type: "Mobile Recharge",
        Account: "0174589745",
        Date: new Date(),
        image: "4.png",
        MoneyDirection: false
      },
      {
        Amount: 200,
        TransActionId: "23ASSUR",
        Type: "Send Money",
        Account: "135345677",
        Date: new Date(),
        image: "1.jpg",
        MoneyDirection: false
      },
      {
        Amount: 48230,
        TransActionId: "LO09877",
        Type: "Add Money",
        Account: "256436456",
        Date: new Date(),
        image: "2.png",
        MoneyDirection: true
      },
    ]
  }
}
