create database appetaizing;

-- Drop the table if it exists
DROP TABLE IF EXISTS users;

-- Create the table if it does not exist
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Drop the table if it exists
DROP TABLE IF EXISTS recipes;

-- Create the table if it does not exist
CREATE TABLE IF NOT EXISTS recipes (
    id SERIAL PRIMARY KEY,
    user_id varchar(255) references users(id),
    name VARCHAR(255) NOT NULL,
    ingredients TEXT [],
    steps TEXT [],
    image_url VARCHAR(255)
);
