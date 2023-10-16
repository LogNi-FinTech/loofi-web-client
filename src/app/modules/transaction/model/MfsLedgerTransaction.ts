
export interface MfsLedgerTransaction {
    id: number;
    checker_id?: number;
    maker_id?: number;
    amount?: number;
    status?: string;
    txnId?: string;
    branch?: string;
    fromAC?: string;
    toAc?: string;
    fromType?: string;
    toType?: string;
    txnTime?: string;
    lastModifiedDate?: string;
}