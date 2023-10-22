import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { accountServiceBaseUrl, kycServiceBaseUrl } from '../../../shared/constant/constant'

@Injectable({
  providedIn: 'root'
})
export class RegistratioService {

  private baseurl = "http://localhost:8080/api";
  private fetchRegistrationUrl = this.baseurl + "/registration";
  private saveRegistrationUrl = this.baseurl + "/registration";
  private changeStatusRegistrationUrl = this.baseurl + "/registration/update/status";
  private saveBulkRegistrationUrl = this.baseurl + "/registration/bulk";
  private checkUniqueidentifierUrl = accountServiceBaseUrl + "api/v1/account/";
  private checkUniqueIdNumberrUrl = kycServiceBaseUrl + "api/customerkyc/idNumber/";

  constructor(private _httpClient: HttpClient) { }

  fetchRegistrationList():Observable<any[]>{
    return this._httpClient.get<any[]>(this.fetchRegistrationUrl, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', }),
    });
  }

  checkUniqueidentifier(identifier){
    return this._httpClient.get<boolean>(this.checkUniqueidentifierUrl + identifier, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', }),
    }).pipe(catchError(err => {
      return throwError(err);
    }));
  }

  checkUniqueIdNumber(idNumber){
    return this._httpClient.get<boolean>(this.checkUniqueIdNumberrUrl + idNumber, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', }),
    }).pipe(catchError(err => {
      return throwError(err);
    }));
  }

  saveRegistration(transaction){
    return this._httpClient.post(this.saveRegistrationUrl, transaction);
  }

  saveBulkRegistration(transactionList){
    return this._httpClient.post(this.saveBulkRegistrationUrl, transactionList);
  }

  changeStatusRegistration(transaction){
    return this._httpClient.post(this.changeStatusRegistrationUrl, transaction);
  }
}
