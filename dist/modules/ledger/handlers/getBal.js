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
exports.handlegetBalance = handlegetBalance;
const ledgerusecase_1 = require("../usecases/ledgerusecase");
class GetBalanceHandler {
    constructor(ledgerUsecase) {
        this.ledgerUsecase = ledgerUsecase;
    }
    processEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                // vallidate
                const account = (_a = event.queryStringParameters) === null || _a === void 0 ? void 0 : _a.account;
                const result = yield this.ledgerUsecase.getBalance(account);
                return {
                    statusCode: 200,
                    body: JSON.stringify(result),
                };
            }
            catch (error) {
                console.error(error);
                return {
                    statusCode: 400,
                    body: JSON.stringify({
                        msg: "Invalid Account Format",
                    }),
                };
            }
        });
    }
}
function handlegetBalance(event) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const body = event.body;
            const ledgerUsecaseInstance = (0, ledgerusecase_1.ledgerUsecase)(event);
            const instance = new GetBalanceHandler(ledgerUsecaseInstance);
            return yield instance.processEvent(event);
        }
        catch (error) {
            console.error(error);
            return {
                statusCode: 500,
                body: JSON.stringify({
                    msg: "Some Error happend while getting the Balance",
                }),
            };
        }
    });
}
//# sourceMappingURL=getBal.js.map