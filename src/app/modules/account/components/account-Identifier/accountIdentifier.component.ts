import { Component, OnInit } from "@angular/core";
import { AccountService } from "../../services/account.service";


@Component({
    // selector: 'app-tutorials-list',
     templateUrl: './accountIdentifer.component.html',
     styleUrls: ['./account-identifier.component.css']
   })

   export class AccountIdentiferComponent implements OnInit{

    identifier="";
    listAcIdentifiers:any;
    showAc=false;
   
    ngOnInit(): void {
        //throw new Error("Method not implemented.");
    }
    constructor(private accountService: AccountService) { }


    getAccount(){

        console.log(this.identifier);
        this.accountService.getByidentifier(this.identifier).subscribe((r)=>{
          
        this.showAc=true;
        console.log(r);
        this.listAcIdentifiers=r;
        console.log(this.listAcIdentifiers);

    })

  }

   }