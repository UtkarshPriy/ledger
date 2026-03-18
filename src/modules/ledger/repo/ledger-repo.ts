import { db } from "../../../shared/db/postgres-client";
import { LedgerEntry } from "../domain/ledger-entry";
import type { PoolClient } from "pg";

export class LedgerRepo {
  // constructor(private readonly entry: LedgerEntry) {} No constructor needed
  async withTransaction<T>(
    work: (client: PoolClient) => Promise<T>,
  ): Promise<T> {
    const client = await db.connect();
    try {
      await client.query("BEGIN");
      const result = await work(client);
      await client.query("COMMIT");
      return result;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
  async save(entry: LedgerEntry, client: PoolClient): Promise<void> {
    await client.query(
      `insert into ledger_entries(account_id, amount, type, currency, trn_name, description, reference_id, balance_effect, idempotency_key)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        entry.accountId,
        entry.amount,
        entry.type,
        entry.currency,
        entry.trn_name,
        entry.desc,
        entry.linked_trn,
        entry.balEffect,
        entry.idempotency_key,
      ],
    );
  }
  async getAccountId(account, client: PoolClient): Promise<string> {
    const result = await client.query(
      `select account_id from accounts where account_number = $1`,
      [account],
    );
    return result.rows[0]?.account_id;
  }
}
