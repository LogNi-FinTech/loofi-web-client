

export class Ledger{
    id?:number;
    onlyParent?: boolean;
    type?: string;
    txnVolume?: string;
    head?: string;
    currency?: any;
    ledgerCode?: string;
    name?: string;
    description?: string;
    parentLedger?: any;
    showAccountsInChart?:boolean;
}