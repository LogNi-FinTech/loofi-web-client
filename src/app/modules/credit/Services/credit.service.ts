import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreditService {

  constructor() { }

  public gerCreditsInfo(){
    return [
      {
        account: "92384592345",
        principleTotal: "Fixed deposit for 3 years",
        interestTotal: 12341234,
        principlePaid: 3555,
        interestPaid: 59234
      },
      {
        account: "9345654",
        principleTotal: "Fixed deposit for 3 years",
        interestTotal: 67865,
        principlePaid: 234,
        interestPaid: 56777
      },
      {
        account: "92384592345",
        principleTotal: "Fixed deposit for 3 years",
        interestTotal: 89434,
        principlePaid: 246,
        interestPaid: 87645
      },
      {
        account: "92384592345",
        principleTotal: "Fixed deposit for 3 years",
        interestTotal: 467895344,
        principlePaid: 9786,
        interestPaid: 45666
      },
      {
        account: "92384592345",
        principleTotal: "Fixed deposit for 3 years",
        interestTotal: 564344566,
        principlePaid: 3456,
        interestPaid: 356
      },
      {
        account: "92384592345",
        principleTotal: "Fixed deposit for 3 years",
        interestTotal: 8954,
        principlePaid: 356,
        interestPaid: 7865
      },
    ]
  }

}
