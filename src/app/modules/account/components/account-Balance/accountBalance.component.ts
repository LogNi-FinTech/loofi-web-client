import { Component, OnInit } from "@angular/core";
import { AccountService } from "../../services/account.service";



@Component({
    // selector: 'app-tutorials-list',
    templateUrl: './accountBalance.component.html',
    styleUrls: ['./accountBalance.component.css']
})
export class AccountBalanceComponent implements OnInit {

    balance = "";
    lsitAcBalances: any;
    isShow = false;
    constructor(private accountService: AccountService) { }
    ngOnInit(): void {
    }
    getAccountBalance() {
        this.accountService.getByBalance(this.balance).subscribe((r) => {
            this.isShow = true;
            this.lsitAcBalances = r;
            console.log(this.lsitAcBalances);
        })
    }

}