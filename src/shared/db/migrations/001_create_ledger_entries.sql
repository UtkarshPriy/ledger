CREATE TYPE entry_type AS ENUM ('CREDIT', 'DEBIT');
CREATE TYPE currency_type AS ENUM ('INR', 'USD', 'EUR', 'GBP');

CREATE TABLE ledger_entries (
  id               UUID          NOT NULL DEFAULT gen_random_uuid(),
  idempotency_key  VARCHAR(100)  NOT NULL,
  account_id       VARCHAR(50)   NOT NULL,
  amount           BIGINT        NOT NULL CHECK (amount > 0),
  type             entry_type    NOT NULL,
  currency         currency_type NOT NULL,
  trn_name         VARCHAR(100)  NOT NULL,
  balance_effect   INT           NOT NULL CHECK (balance_effect IN (1, -1)),
  reference_id     VARCHAR(100),
  created_at       TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  description      TEXT,
  PRIMARY KEY (id),
  UNIQUE (account_id, idempotency_key)
);