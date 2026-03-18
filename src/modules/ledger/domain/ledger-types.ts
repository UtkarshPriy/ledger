import type { PoolClient } from "pg";
import type { LedgerEntry } from "./ledger-entry";

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

// domain interface
// export interface ILedgerRepo {
//   getAccountId(acount: string, client: PoolClient): Promise<string>;
//   save(entry: LedgerEntry, client: PoolClient): Promise<void>;
//   withTransaction<T>(fn: (client: PoolClient) => Promise<T>): Promise<T>;
// }
