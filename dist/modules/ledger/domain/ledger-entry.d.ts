import { EntryType, CurType, EffectType } from "./ledger-types";
export declare class LedgerEntry {
    readonly accountId: string;
    readonly amount: number;
    readonly type: EntryType;
    readonly currency: CurType;
    readonly trn_name: string;
    readonly idempotency_key: string;
    readonly desc?: string;
    readonly linked_trn?: string;
    readonly createdAt: Date;
    readonly balEffect: EffectType;
    constructor(accountId: string, amount: number, type: EntryType, currency: CurType, trn_name: string, idempotency_key: string, desc?: string, linked_trn?: string);
}
//# sourceMappingURL=ledger-entry.d.ts.map