-- Create the towns table
CREATE TABLE towns (
  id SERIAL PRIMARY KEY,
  town_name TEXT NOT NULL,
  name TEXT NOT NULL
);

-- Create the registration_numbers table
CREATE TABLE registration_numbers (
  id SERIAL PRIMARY KEY,
  number TEXT NOT NULL,
  town_id INT REFERENCES towns(id)
);
