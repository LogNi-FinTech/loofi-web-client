
import { Component, OnInit } from "@angular/core";
import { AccountStatement } from "../../models/acStatement.model";
import { AccountService } from "../../services/account.service";

@Component({
    // selector: 'app-tutorials-list',
    templateUrl: './accountStatement.component.html',
    styleUrls: ['./accountStatement.component.css']
})
export class AccountStatementComponent implements OnInit {

    account = "";
    listAcStatement: AccountStatement[] = [];
    isShow = false;
    listAcIdentifiers: any;
    lsitAcBalances: any;
    totalDebit = 0;
    totalCredit = 0;
    constructor(private accountService: AccountService) { }

    ngOnInit(): void {
        //throw new Error("Method not implemented.");
        //this.getAcStatement();
    }

    getAcStatement() {

        this.accountService.getAccountStatement(this.account).subscribe((r) => {
            this.isShow = true;
            this.listAcStatement = r.content
            console.log(this.listAcStatement);

            this.listAcStatement?.forEach(e => {
                if (e.amount != null) {
                    if (e.amount >= 0) {
                        this.totalDebit = this.totalDebit + e.amount;
                    }
                    else {
                        this.totalCredit = this.totalCredit + e.amount;
                    }
                }
            })

        })

        this.accountService.getByidentifier(this.account).subscribe((r) => {
            this.listAcIdentifiers = r;
            console.log(this.listAcIdentifiers);
        })

        this.accountService.getByBalance(this.account).subscribe((r) => {
            this.lsitAcBalances = r;
            console.log(this.lsitAcBalances);
        });
    }
}