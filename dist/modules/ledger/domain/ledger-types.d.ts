export type EntryType = "CREDIT" | "DEBIT";
export type CurType = "INR" | "USD" | "EUR" | "GBP";
export type EffectType = -1 | 1;
export interface CreditInput {
    amount: number;
    acount: string;
    currency: CurType;
    trn_name: string;
    type: EntryType;
    reference_id?: string;
    description?: string;
}
//# sourceMappingURL=ledger-types.d.ts.map