import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Constants } from "../../../shared/common/constants";


// const url = 'http://localhost:8080/api/v1/account';
// const urlBlance= 'http://localhost:8080/api/v1/account/balance';
// const urlStatement= 'http://localhost:8080/api/v1/account/statement';

const url: string = Constants.apiBase + "/api/v1/account";
const urlBlance: string = Constants.apiBase + "/api/v1/account/balance";
const urlStatement: string = Constants.apiBase + "/api/v1/account/statement";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getByidentifier(identifier: string): Observable<any> {
    return this.http.get(`${url}/${identifier}`);
  }

  getByBalance(balance: string): Observable<any> {
    return this.http.get(`${urlBlance}/${balance}`);
  }

  getAccountStatement(account: string): Observable<any> {
    return this.http.get(urlStatement + "?account=" + account);
  }

  create(data: any): Observable<any> {
    return this.http.post(url, data);
  }

  //   update(id: any, data: any): Observable<any> {
  //     return this.http.put(`${baseUrl}/${id}`, data);
  //   }

  //   delete(id: any): Observable<any> {
  //     return this.http.delete(`${baseUrl}/${id}`);
  //   }

  //   deleteAll(): Observable<any> {
  //     return this.http.delete(baseUrl);
  //   }

  //   findByTitle(title: any): Observable<Tutorial[]> {
  //     return this.http.get<Tutorial[]>(`${baseUrl}?title=${title}`);
  //   }

}