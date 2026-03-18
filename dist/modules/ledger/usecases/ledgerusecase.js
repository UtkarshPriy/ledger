"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedgerUsecase = void 0;
exports.ledgerUsecase = ledgerUsecase;
const ledger_entry_1 = require("../domain/ledger-entry");
const ledger_repo_1 = require("../repo/ledger-repo");
class LedgerUsecase {
    constructor(ledger_repo) {
        this.ledger_repo = ledger_repo;
    }
    creditAmount(input, idempotency_key) {
        return __awaiter(this, void 0, void 0, function* () {
            const { amount, acount, currency, trn_name, type, reference_id: linked_trn, description: desc, } = input;
            // fetch Id through repo
            const result = yield this.ledger_repo.withTransaction((client) => __awaiter(this, void 0, void 0, function* () {
                const accountId = yield this.ledger_repo.getAccountId(acount, client);
                const entry = new ledger_entry_1.LedgerEntry(accountId, amount, type, currency, trn_name, idempotency_key, desc, linked_trn);
                return yield this.ledger_repo.save(entry, client);
            }));
        });
    }
}
exports.LedgerUsecase = LedgerUsecase;
function ledgerUsecase(event) {
    try {
        const ledgerInstance = new ledger_repo_1.LedgerRepo();
        const instance = new LedgerUsecase(ledgerInstance);
        return instance;
        // instance.processEvent();
    }
    catch (error) {
        console.error(error);
    }
}
//# sourceMappingURL=ledgerusecase.js.map