CREATE TYPE account_type AS ENUM ('SAVINGS', 'CURRENT','LOAN','DECUM');
CREATE TYPE account_status AS ENUM ('ACTIVE', 'INACTIVE', 'FROZEN', 'CLOSED');
CREATE TABLE accounts (
  account_id               UUID          NOT NULL DEFAULT gen_random_uuid(),
  account_number       VARCHAR(50)   NOT NULL,
  status_code account_status,
  type             account_type,    
  name         VARCHAR(50)   NOT NULL,
  created_at       TIMESTAMP     NOT NULL DEFAULT NOW(),
  description     TEXT,
  PRIMARY KEY (account_id),
  UNIQUE (account_number)
);