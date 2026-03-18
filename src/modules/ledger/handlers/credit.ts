import z, { json, number, string } from "zod";
import { LedgerUsecase, ledgerUsecase } from "../usecases/ledgerusecase";
export const wallteSchema = z.object({
  amount: z.number().positive(),
  acount: z.string(),
  currency: z.enum(["INR", "USD", "EUR", "GBP"]),
  trn_name: z.string(),
  type: z.enum(["CREDIT", "DEBIT"]),
  reference_id: z.string().optional(),
  description: z.string().optional(),
});

class LedgerCreditHandler {
  constructor(private readonly LedgerUsecase: LedgerUsecase) {}
  async processEvent(event: any, idempotency_key) {
    // Vallidate
    const body = JSON.parse(event.body);
    const safeBody = wallteSchema.parse(body);
    const result = await this.LedgerUsecase.creditAmount(
      safeBody,
      idempotency_key,
    );
    return {
      statusCode: 201,
      body: JSON.stringify(result),
    };
  }
}

export async function handleLedgerCredit(event: any) {
  try {
    const idempotency_key = event.headers["idempotency-key"];
    if (!idempotency_key)
      return {
        statusCode: 400,
        body: JSON.stringify({ msg: "Idempotency-Key header required" }),
      };
    const creditLedgerUsecaseInstance = ledgerUsecase(event);
    const instance = new LedgerCreditHandler(creditLedgerUsecaseInstance);
    return await instance.processEvent(event, idempotency_key);
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        msg: "Some Error happend while creditting the ledger",
      }),
    };
  }
}
