CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(160) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
    stock INTEGER NOT NULL CHECK (stock >= 0),
    thumbnail_url VARCHAR(500) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
