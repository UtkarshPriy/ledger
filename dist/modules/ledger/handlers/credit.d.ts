import z from "zod";
export declare const wallteSchema: z.ZodObject<{
    amount: z.ZodNumber;
    acount: z.ZodString;
    currency: z.ZodEnum<{
        INR: "INR";
        USD: "USD";
        EUR: "EUR";
        GBP: "GBP";
    }>;
    trn_name: z.ZodString;
    type: z.ZodEnum<{
        CREDIT: "CREDIT";
        DEBIT: "DEBIT";
    }>;
    reference_id: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare function handleLedgerCredit(event: any): Promise<{
    statusCode: number;
    body: string;
}>;
//# sourceMappingURL=credit.d.ts.map