import { Injectable } from '@angular/core';
import { featureRoleMap } from 'app/root/FeatureRoleMap';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

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
}
