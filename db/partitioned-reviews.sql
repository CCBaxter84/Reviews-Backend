CREATE TABLE if not exists partreviews (
  review_id serial PRIMARY KEY,
  rating INTEGER,
  recommend BOOLEAN,
  response VARCHAR(255),
  body VARCHAR(255),
  date TIMESTAMPTZ,
  reviewer_name VARCHAR(255),
  helpfulness INTEGER,
  reported BOOLEAN,
  product_id INTEGER
) PARTITION BY RANGE (review_id);

CREATE TABLE if not exists _firstmreviews PARTITION OF partreviews FOR VALUES FROM ('1') TO ('1000000');

CREATE TABLE if not exists _secondmreviews PARTITION OF partreviews FOR VALUES FROM ('1000000') TO ('2000000');

CREATE TABLE if not exists _thirdmreviews PARTITION OF partreviews FOR VALUES FROM ('2000000') TO ('3000000');

CREATE TABLE if not exists _fourthmreviews PARTITION OF partreviews FOR VALUES FROM ('3000000') TO ('4000000');

CREATE TABLE if not exists _fifthmreviews PARTITION OF partreviews FOR VALUES FROM ('4000000') TO ('5000000');

CREATE TABLE if not exists _sixthmreviews PARTITION OF partreviews FOR VALUES FROM ('5000000') TO ('6000000');

CREATE TABLE if not exists _seventhmreviews PARTITION OF partreviews FOR VALUES FROM ('6000000') TO ('7000000');

CREATE TABLE if not exists _eighthmreviews PARTITION OF partreviews FOR VALUES FROM ('7000000') TO ('8000000');

CREATE TABLE if not exists _ninthmreviews PARTITION OF partreviews FOR VALUES FROM ('8000000') TO ('9000000');

CREATE TABLE if not exists _tenthmreviews PARTITION OF partreviews FOR VALUES FROM ('9000000') TO ('11000000');

\copy partreviews(rating, recommend, response, body, date, reviewer_name, helpfulness, reported, product_id) FROM '/Users/mywork/Documents/coding_projects/work/sdc/Reviews-Backend/db/csv/all.csv' WITH DELIMITER ',' CSV HEADER;