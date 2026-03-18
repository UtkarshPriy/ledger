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
exports.LedgerRepo = void 0;
const postgres_client_1 = require("../../../shared/db/postgres-client");
class LedgerRepo {
    // constructor(private readonly entry: LedgerEntry) {} No constructor needed
    withTransaction(work) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield postgres_client_1.db.connect();
            try {
                yield client.query("BEGIN");
                const result = yield work(client);
                yield client.query("COMMIT");
                return result;
            }
            catch (error) {
                yield client.query("ROLLBACK");
                throw error;
            }
            finally {
                client.release();
            }
        });
    }
    save(entry, client) {
        return __awaiter(this, void 0, void 0, function* () {
            yield client.query(`insert into ledger_entries(account_id, amount, type, currency, trn_name, description, reference_id, balance_effect, idempotency_key)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [
                entry.accountId,
                entry.amount,
                entry.type,
                entry.currency,
                entry.trn_name,
                entry.desc,
                entry.linked_trn,
                entry.balEffect,
                entry.idempotency_key,
            ]);
        });
    }
    getAccountId(account, client) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const result = yield client.query(`select account_id from accounts where account_number = $1`, [account]);
            return (_a = result.rows[0]) === null || _a === void 0 ? void 0 : _a.account_id;
        });
    }
}
exports.LedgerRepo = LedgerRepo;
//# sourceMappingURL=ledger-repo.js.map