"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedgerEntry = void 0;
class LedgerEntry {
    constructor(accountId, amount, type, currency, trn_name, idempotency_key, desc, linked_trn) {
        this.accountId = accountId;
        this.amount = amount;
        this.type = type;
        this.currency = currency;
        this.trn_name = trn_name;
        this.idempotency_key = idempotency_key;
        this.desc = desc;
        this.linked_trn = linked_trn;
        if (amount <= 0) {
            throw new Error("Amount must be positive");
        }
        this.createdAt = new Date();
        this.balEffect = type === "CREDIT" ? 1 : -1;
    }
}
exports.LedgerEntry = LedgerEntry;
//# sourceMappingURL=ledger-entry.js.map