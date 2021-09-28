CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  name VARCHAR NOT NULL,
  id VARCHAR NOT NULL DEFAULT uuid_generate_v4(),
  email VARCHAR UNIQUE NOT NULL,
  created_at TIMESTAMP NOT NULL,
  hashed_password VARCHAR NOT NULL,
  wishlist JSON[],
  cart JSON[],
  addresses JSON[],
  admin_level INT NOT NULL DEFAULT 0 
)

CREATE TABLE products (
  name VARCHAR NOT NULL,
  id VARCHAR NOT NULL DEFAULT uuid_generate_v4(),
  description JSON NOT NULL,
  url VARCHAR NOT NULL,
  price INT NOT NULL,
  sale_price INT NOT NULL,
  category VARCHAR NOT NULL,
  is_sale BOOLEAN NOT NULL DEFAULT FALSE,
  seller_name VARCHAR NOT NULL
);

CREATE TABLE reviews (
  id VARCHAR NOT NULL DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  user_id VARCHAR NOT NULL,
  product_id VARCHAR NOT NULL,
  title VARCHAR NOT NULL,
  body VARCHAR NOT NULL,
  rating VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE orders (
  id VARCHAR NOT NULL DEFAULT uuid_generate_v4(),
  user_id VARCHAR NOT NULL,
  order_content JSON[],
  is_delivered BOOLEAN,
  created_at TIMESTAMP NOT NULL
)
