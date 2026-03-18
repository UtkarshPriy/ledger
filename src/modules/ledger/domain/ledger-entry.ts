import { EntryType, CurType, EffectType } from "./ledger-types";

export class LedgerEntry {
  public readonly createdAt: Date;
  public readonly balEffect: EffectType;

  constructor(
    public readonly accountId: string,
    public readonly amount: number,
    public readonly type: EntryType,
    public readonly currency: CurType,
    public readonly trn_name: string,
    public readonly idempotency_key: string,
    public readonly desc?: string,
    public readonly linked_trn?: string,
  ) {
    if (amount <= 0) {
      throw new Error("Amount must be positive");
    }
    this.createdAt = new Date();
    this.balEffect = type === "CREDIT" ? 1 : -1;
  }
}
