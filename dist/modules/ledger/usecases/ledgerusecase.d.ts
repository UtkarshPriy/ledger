import { CreditInput } from "../domain/ledger-types";
import { LedgerRepo } from "../repo/ledger-repo";
export declare class LedgerUsecase {
    private readonly ledger_repo;
    constructor(ledger_repo: LedgerRepo);
    creditAmount(input: CreditInput, idempotency_key: any): Promise<void>;
}
export declare function ledgerUsecase(event: any): LedgerUsecase;
//# sourceMappingURL=ledgerusecase.d.ts.map