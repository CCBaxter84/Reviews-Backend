CREATE TABLE if not exists reviews (
  review_id serial PRIMARY KEY,
  rating INTEGER,
  recommend BOOLEAN,
  response VARCHAR(255),
  body VARCHAR(255),
  date TIMESTAMPTZ,
  reviewer_name VARCHAR(255),
  helpfulness INTEGER,
  photos text[],
  reported BOOLEAN,
  product_id INTEGER
);

\copy reviews(rating, recommend, response, body, date, reviewer_name, helpfulness, reported, product_id) FROM '/Users/mywork/Documents/coding_projects/work/sdc/Reviews-Backend/db/all.csv' WITH DELIMITER ',' CSV HEADER;