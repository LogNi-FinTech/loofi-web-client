import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WealthService {

  constructor() { }

  public gerWealths(){
    return [
      {
        account: "92384592345",
        product: "Fixed deposit for 3 years",
        principleAmount: 12341234,
        earned: 3555,
        goingToEarn: 59234
      },
      {
        account: "9345654",
        product: "Fixed deposit for 3 years",
        principleAmount: 67865,
        earned: 234,
        goingToEarn: 56777
      },
      {
        account: "92384592345",
        product: "Fixed deposit for 3 years",
        principleAmount: 89434,
        earned: 246,
        goingToEarn: 87645
      },
      {
        account: "92384592345",
        product: "Fixed deposit for 3 years",
        principleAmount: 467895344,
        earned: 9786,
        goingToEarn: 45666
      },
      {
        account: "92384592345",
        product: "Fixed deposit for 3 years",
        principleAmount: 564344566,
        earned: 3456,
        goingToEarn: 356
      },
      {
        account: "92384592345",
        product: "Fixed deposit for 3 years",
        principleAmount: 8954,
        earned: 356,
        goingToEarn: 7865
      },
    ]
  }
}
