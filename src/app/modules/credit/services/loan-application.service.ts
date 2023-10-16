import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { creditServiceBaseUrl } from 'app/shared/constant/baseUrl';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoanApplicationService {

  private fetchLoanApplicationUrl = creditServiceBaseUrl + "api/application";
  private saveLoanApplicationUrl =  creditServiceBaseUrl + "api/application";
  private deleteLoanApplicationUrl =  creditServiceBaseUrl + "api/application/";

  private downloadDocumentUrl =  creditServiceBaseUrl + "api/application/document/";

  constructor(private _httpClient: HttpClient) { }

  fetchLoanApplications():Observable<any[]>{
    return this._httpClient.get<any[]>(this.fetchLoanApplicationUrl, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', }),
    });
  }

  saveLoanApplication(loanApplication){
    return this._httpClient.post(this.saveLoanApplicationUrl, loanApplication);
  }

  deleteLoanApplication(loanApplicationId){
    return this._httpClient.delete(this.deleteLoanApplicationUrl+loanApplicationId, {responseType: 'text'});
  }

  downloadDocument(fileName){
    return this._httpClient.get<Blob>(this.downloadDocumentUrl + fileName,
    { responseType: 'blob' as 'json' });
  }
}
