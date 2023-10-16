import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { accountServiceBaseUrl, creditServiceBaseUrl, kycServiceBaseUrl } from 'app/shared/constant/baseUrl';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanProductService {

  private fetchLoanProductUrl = creditServiceBaseUrl + "api/product";
  private saveLoanProductUrl =  creditServiceBaseUrl + "api/product";
  private deleteLoanProductUrl =  creditServiceBaseUrl + "api/product/";
  private fetchCustomerByIdUrl =  accountServiceBaseUrl + "api/v1/account/";
  private fetchCustomerByMobileUrl =  kycServiceBaseUrl + "api/customerkyc/mobile/";

  constructor(private _httpClient: HttpClient) { }

  fetchLoanProductList():Observable<any[]>{
    return this._httpClient.get<any[]>(this.fetchLoanProductUrl, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', }),
    });
  }

  saveLoanProduct(loanProduct){
    return this._httpClient.post(this.saveLoanProductUrl, loanProduct);
  }

  deleteLoanProduct(loanProductId){
    return this._httpClient.delete(this.deleteLoanProductUrl+loanProductId, {responseType: 'text'});
  }

  fetchCustomerById(customerId){
    return this._httpClient.get<any[]>(this.fetchCustomerByIdUrl + customerId, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', }),
    });
  }

  fetchCustomerByMobile(mobileNo){
    return this._httpClient.get<any[]>(this.fetchCustomerByMobileUrl + mobileNo, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', }),
    });
  }

  // changeStatusLoanProduct(transaction){
  //   return this._httpClient.post(this.changeStatusLoanProductUrl, transaction);
  // }
}
