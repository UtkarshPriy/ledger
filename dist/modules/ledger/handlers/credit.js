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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallteSchema = void 0;
exports.handleLedgerCredit = handleLedgerCredit;
const zod_1 = __importDefault(require("zod"));
const ledgerusecase_1 = require("../usecases/ledgerusecase");
exports.wallteSchema = zod_1.default.object({
    amount: zod_1.default.number().positive(),
    acount: zod_1.default.string(),
    currency: zod_1.default.enum(["INR", "USD", "EUR", "GBP"]),
    trn_name: zod_1.default.string(),
    type: zod_1.default.enum(["CREDIT", "DEBIT"]),
    reference_id: zod_1.default.string().optional(),
    description: zod_1.default.string().optional(),
});
class LedgerCreditHandler {
    constructor(LedgerUsecase) {
        this.LedgerUsecase = LedgerUsecase;
    }
    processEvent(event, idempotency_key) {
        return __awaiter(this, void 0, void 0, function* () {
            // Vallidate
            const body = JSON.parse(event.body);
            const safeBody = exports.wallteSchema.parse(body);
            const result = yield this.LedgerUsecase.creditAmount(safeBody, idempotency_key);
            return {
                statusCode: 201,
                body: JSON.stringify(result),
            };
        });
    }
}
function handleLedgerCredit(event) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const idempotency_key = event.headers["idempotency-key"];
            if (!idempotency_key)
                return {
                    statusCode: 400,
                    body: JSON.stringify({ msg: "Idempotency-Key header required" }),
                };
            const creditLedgerUsecaseInstance = (0, ledgerusecase_1.ledgerUsecase)(event);
            const instance = new LedgerCreditHandler(creditLedgerUsecaseInstance);
            return yield instance.processEvent(event, idempotency_key);
        }
        catch (error) {
            console.error(error);
            return {
                statusCode: 500,
                body: JSON.stringify({
                    msg: "Some Error happend while creditting the ledger",
                }),
            };
        }
    });
}
//# sourceMappingURL=credit.js.map