CREATE TABLE if not exists characteristics (
  characteristic_id serial PRIMARY KEY,
  name VARCHAR(255),
  value DECIMAL,
  product_id INTEGER
);

\copy characteristics(name, value, product_id) FROM '/Users/mywork/Documents/coding_projects/work/sdc/Reviews-Backend/db/csv/allChar.csv' WITH DELIMITER ',' CSV HEADER;