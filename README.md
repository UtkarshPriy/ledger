# Ledger — AWS Serverless Fintech Platform

A production-grade ledger management system built with **Node.js + TypeScript, AWS Lambda, Aurora PostgreSQL, and Serverless Framework**.

## Features

- **ACID-compliant transactions** — Multi-table Aurora transactions with automatic rollback
- **Idempotent API operations** — DB-level idempotency keys prevent duplicate processing
- **Audit logging** — Immutable append-only transaction history for regulatory compliance
- **Event-driven architecture** — SQS integration for asynchronous processing
- **Structured logging** — CloudWatch integration with request tracing
- **Layer separation** — Handler → Usecase → Domain ← Repo pattern

## Tech Stack

| Layer             | Technology                             |
| ----------------- | -------------------------------------- |
| **Runtime**       | Node.js 20 + TypeScript                |
| **Infra**         | AWS Lambda + API Gateway (HTTP API v2) |
| **Database**      | Amazon Aurora (PostgreSQL)             |
| **Cache**         | ElastiCache (Redis)                    |
| **Queue**         | SQS + SNS                              |
| **Auth**          | Amazon Cognito (JWT)                   |
| **Observability** | CloudWatch + X-Ray tracing             |
| **IaC**           | Serverless Framework v4                |

## Project Structure

```
src/
├── modules/
│   ├── ledger/           # Ledger operations (credit, debit, balance)
│   ├── transaction/      # Transaction management
│   ├── user/            # User & account management
│   └── events/          # Domain events & SQS handlers
└── shared/
    ├── db/              # Aurora connection pooling
    ├── cache/           # Redis client
    ├── logger/          # Structured logging
    └── errors/          # Fintech error types
```

## Setup

### Prerequisites

- Node.js 20+
- AWS CLI configured
- Aurora PostgreSQL cluster
- Serverless Framework: `npm i -g serverless`

### Local Development

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set environment variables:**

   ```bash
   export DB_PASSWORD="your-password"
   ```

3. **Run locally:**

   ```bash
   npm run build
   sls offline
   ```

   API available at `http://localhost:3000`

## API Endpoints

### Credit

```http
POST /credit
idempotency-key: unique-id
Content-Type: application/json

{
  "account": "ACC123",
  "amount": 1000,
  "currency": "INR",
  "type": "CREDIT",
  "trn_name": "salary_deposit",
  "description": "Monthly salary"
}
```

### Debit

```http
POST /debit
idempotency-key: unique-id
Content-Type: application/json

{
  "account": "ACC123",
  "amount": 500,
  "currency": "INR",
  "type": "DEBIT",
  "trn_name": "withdrawal",
  "description": "ATM withdrawal"
}
```

### Get Balance

```http
GET /getBalance?account=ACC123
```

Response:

```json
{
  "balance": 4500,
  "currency": "INR",
  "lastUpdated": "2024-04-12T10:30:00Z"
}
```

## Key Design Patterns

### Idempotency

All write operations require an `idempotency-key` header. The same key replayed returns the same result without duplicate processing.

### ACID Transactions

```typescript
await repo.withTransaction(async (client) => {
  const accountId = await repo.getAccountId(account, client);
  await repo.save(entry, client);
  // Auto-COMMIT or ROLLBACK
});
```

### Layer Separation

- **Handler** — HTTP validation only
- **Usecase** — Business logic orchestration
- **Repo** — Database operations only
- **Domain** — Pure business rules (zero external dependencies)

## Deployment

```bash
# Dev
serverless deploy --stage dev

# Production
serverless deploy --stage prod
```

## Logging

All operations log to CloudWatch with structure:

```json
{
  "level": "INFO",
  "message": "creditAmount started",
  "timestamp": "2024-04-12T10:30:00Z",
  "requestId": "uuid-xxx",
  "accountId": "account-uuid",
  "amount": 1000
}
```

**Note:** No PII is logged (names, full account numbers, etc.) — compliance requirement.

## Security

- Credentials via AWS Secrets Manager (never env vars)
- JWT validation via API Gateway authorizer
- Least-privilege IAM roles per function
- Database: SSL/TLS encryption in transit

## Monitoring

- **CloudWatch Logs** — All function executions
- **X-Ray Tracing** — Request flow across services
- **CloudWatch Metrics** — Transaction volume, latency, errors

## Contributing

1. Branch naming: `feature/xxx` or `fix/xxx`
2. Commit messages: Follow conventional commits
3. Code review required before merge to `master`

## License

Proprietary — Utkarsh Priy

## Contact

For questions, reach out via GitHub issues.
