import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { featureRoleMap } from 'app/root/FeatureRoleMap';
import { accountServiceBaseUrl } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private getAccountInfoUrl = accountServiceBaseUrl + "api/v1/account/"
  private getBalanceInfoUrl = accountServiceBaseUrl + "api/v1/account/balance/"
  constructor(private _httpClient: HttpClient) { }

  featureList() : string[]{
    return featureRoleMap.filter(data=> data.roleName === this.userRole)[0].featureList;
  }

  get userRole(): string
  {
      if(localStorage.getItem('role') == "undefined"){
          return null;
      }
      return localStorage.getItem('role') ?? null;
  }

  get userId(): string
  {
      if(localStorage.getItem('id') == "undefined"){
          return null;
      }
      return localStorage.getItem('id') ?? null;
  }

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

  public getIdentifier(): string {
    if (localStorage.getItem('identifier') == "undefined") {
      return null;
    }
    return localStorage.getItem('identifier') ?? null;
  }
}
