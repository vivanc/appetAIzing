create database appetaizing;

-- Drop the table if it exists
DROP TABLE IF EXISTS users;

-- Create the table if it does not exist
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
);

-- Drop the table if it exists
DROP TABLE IF EXISTS recipes;

-- Create the table if it does not exist
CREATE TABLE IF NOT EXISTS recipes (
    id SERIAL PRIMARY KEY,
    user_id varchar(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    ingredients TEXT [],
    steps TEXT [],
    image_url VARCHAR(255)
);

-- Error message: value too long for type character varying(255)
-- To alter column datatype:
--      ALTER TABLE recipes
--      ALTER COLUMN image_url TEXT;

-- To check table datatype:
--      \d recipes
