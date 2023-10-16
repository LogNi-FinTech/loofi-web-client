import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { creditServiceBaseUrl } from 'app/shared/constant/baseUrl';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  private saveLoanUrl =  creditServiceBaseUrl + "api/loan";
  private fetchLoanUrl = creditServiceBaseUrl + "api/loan";
  private fetchLoanRepaymentListUrl = creditServiceBaseUrl + "api/loan-repayment/";

  constructor(private _httpClient: HttpClient) { }

  saveLoan(loanData){
    return this._httpClient.post(this.saveLoanUrl, loanData);
  }

  fetchLoanList():Observable<any[]>{
    return this._httpClient.get<any[]>(this.fetchLoanUrl, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', }),
    });
  }

  fetchLoanRepaymentList(loanId):Observable<any[]>{
    return this._httpClient.get<any[]>(this.fetchLoanRepaymentListUrl + loanId, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', }),
    });
  }
}
