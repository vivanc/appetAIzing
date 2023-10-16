create database appetaizing;

-- Drop the table if it exists
DROP TABLE IF EXISTS users;

-- Create the table if it does not exist
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);

-- Drop the table if it exists
DROP TABLE IF EXISTS recipes;

-- Create the table if it does not exist
CREATE TABLE IF NOT EXISTS recipes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    ingredients VARCHAR(255),
    steps VARCHAR(255),
    image_url VARCHAR(255)
);
