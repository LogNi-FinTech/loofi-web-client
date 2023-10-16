import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Account } from "../../models/account.model";
import { Ledger } from "../../models/ledger.model";
import { AccountService } from "../../services/account.service";
import { LedgerService } from "../../services/ledger.service";
import { SnakBarService } from 'app/shared/service/snak-bar.service';


@Component({
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})

export class AccountCreateComponent implements OnInit {
  accountObj = new Account();
  ledgers: Ledger[] = [];
  accountform: FormGroup;
  public isLoading = false;

  constructor(private accountService: AccountService,
    private ledgerService: LedgerService,
    private fb: FormBuilder,
    private snakBarService: SnakBarService) { }

  ngOnInit(): void {
    this.getLedger();
    this.initialIzeForm();
  }

  initialIzeForm() {
    this.accountform = this.fb.group({
      name: ['', Validators.required],
      identifier: ['', Validators.required],
      ledgerId: ['', Validators.required],
      customerId: ['', Validators.required],
      alternativeAccountNumber: ['', Validators.required],
    });
  }

  createAccount() {
    console.log('this.getRawValue() :>> ', this.accountform.getRawValue());
    this.isLoading = true;
    this.accountService.create(this.accountform.getRawValue()).subscribe((r) => {
      console.log(r);
      this.snakBarService.showMessage("Successfully Saved");
      this.isLoading = false;
    },
      (error) => {
        this.snakBarService.showMessage("An error has occured");
        this.isLoading = false;
      });
  }

  getLedger() {
    this.ledgerService.getAll().subscribe((r) => {
      this.ledgers = r.content;
      let ledgerFilter: Ledger[] = [];
      // this.ledgers = this.ledgers?.filter(x=>{x.type='MEMBER'})
      this.ledgers?.forEach(e => {
        if (e.type == 'MEMBER') {
          ledgerFilter.push(e);
        }
      })
      this.ledgers = ledgerFilter;
    })
  }
}