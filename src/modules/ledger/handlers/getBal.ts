import { json } from "zod";
import { ledgerUsecase, LedgerUsecase } from "../usecases/ledgerusecase";

class GetBalanceHandler {
  constructor(public readonly ledgerUsecase: LedgerUsecase) {}
  async processEvent(event: any) {
    try {
      // vallidate
      const account = event.queryStringParameters?.account;
      const result = await this.ledgerUsecase.getBalance(account);
      return {
        statusCode: 200,
        body: JSON.stringify(result),
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 400,
        body: JSON.stringify({
          msg: "Invalid Account Format",
        }),
      };
    }
  }
}

export async function handlegetBalance(event: any) {
  try {
    // const body = event.body;
    const ledgerUsecaseInstance = ledgerUsecase(event);
    const instance = new GetBalanceHandler(ledgerUsecaseInstance);
    return await instance.processEvent(event);
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        msg: "Some Error happend while getting the Balance",
      }),
    };
  }
}
