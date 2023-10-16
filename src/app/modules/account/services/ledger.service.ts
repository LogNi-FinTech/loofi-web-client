import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Constants } from "../../../shared/common/constants";


const url: string = Constants.apiBase + "/api/v1/ledger"
@Injectable({
  providedIn: 'root'
})
export class LedgerService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(url);
  }

  create(ledgerObj: any): Observable<any> {
    return this.http.post(url, ledgerObj);
  }

  update(updateLedgerObj: any): Observable<any> {
    return this.http.put(url, updateLedgerObj);
  }
}