import { LedgerEntry } from "../domain/ledger-entry";
import type { PoolClient } from "pg";
export declare class LedgerRepo {
    withTransaction<T>(work: (client: PoolClient) => Promise<T>): Promise<T>;
    save(entry: LedgerEntry, client: PoolClient): Promise<void>;
    getAccountId(account: any, client: PoolClient): Promise<string>;
}
//# sourceMappingURL=ledger-repo.d.ts.map