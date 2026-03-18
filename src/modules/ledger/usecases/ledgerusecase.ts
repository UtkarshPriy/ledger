import { number, string } from "zod";
import { LedgerEntry } from "../domain/ledger-entry";
import { CreditInput } from "../domain/ledger-types";
import { LedgerRepo } from "../repo/ledger-repo";
export class LedgerUsecase {
  constructor(private readonly ledger_repo: LedgerRepo) {}
  async creditAmount(input: CreditInput, idempotency_key) {
    const {
      amount,
      acount,
      currency,
      trn_name,
      type,
      reference_id: linked_trn,
      description: desc,
    } = input;
    // fetch Id through repo
    const result = await this.ledger_repo.withTransaction(async (client) => {
      const accountId = await this.ledger_repo.getAccountId(acount, client);
      const entry = new LedgerEntry(
        accountId,
        amount,
        type,
        currency,
        trn_name,
        idempotency_key,
        desc,
        linked_trn,
      );

      return await this.ledger_repo.save(entry, client);
    });
  }
}

export function ledgerUsecase(event: any) {
  try {
    const ledgerInstance = new LedgerRepo();
    const instance = new LedgerUsecase(ledgerInstance);
    return instance;
    // instance.processEvent();
  } catch (error) {
    console.error(error);
  }
}
