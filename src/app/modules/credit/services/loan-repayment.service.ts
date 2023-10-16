import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { creditServiceBaseUrl } from 'app/shared/constant/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class LoanRepaymentService {

  private partialPaymentUrl =  creditServiceBaseUrl + "api/loan-repayment/payment";

  constructor(private _httpClient: HttpClient) { }

  partialPayment(partialPaymentPayload){
    return this._httpClient.post(this.partialPaymentUrl, partialPaymentPayload);
  }
}
