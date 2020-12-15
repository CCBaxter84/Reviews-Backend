CREATE TABLE if not exists reviewsphotos (
  review_id serial PRIMARY KEY,
  rating INTEGER,
  recommend BOOLEAN,
  response VARCHAR(255),
  body VARCHAR(255),
  date TIMESTAMPTZ,
  reviewer_name VARCHAR(255),
  helpfulness INTEGER,
  photos jsonb,
  reported BOOLEAN,
  product_id INTEGER
) PARTITION BY RANGE (review_id);

CREATE TABLE if not exists _1stmreviews PARTITION OF reviewsphotos FOR VALUES FROM ('1') TO ('1000000');

CREATE TABLE if not exists _2ndmreviews PARTITION OF reviewsphotos FOR VALUES FROM ('1000000') TO ('2000000');

CREATE TABLE if not exists _3rdmreviews PARTITION OF reviewsphotos FOR VALUES FROM ('2000000') TO ('3000000');

CREATE TABLE if not exists _4thmreviews PARTITION OF reviewsphotos FOR VALUES FROM ('3000000') TO ('4000000');

CREATE TABLE if not exists _5thmreviews PARTITION OF reviewsphotos FOR VALUES FROM ('4000000') TO ('5000000');

CREATE TABLE if not exists _6thmreviews PARTITION OF reviewsphotos FOR VALUES FROM ('5000000') TO ('6000000');

CREATE TABLE if not exists _7thmreviews PARTITION OF reviewsphotos FOR VALUES FROM ('6000000') TO ('7000000');

CREATE TABLE if not exists _8thmreviews PARTITION OF reviewsphotos FOR VALUES FROM ('7000000') TO ('8000000');

CREATE TABLE if not exists _9thmreviews PARTITION OF reviewsphotos FOR VALUES FROM ('8000000') TO ('9000000');

CREATE TABLE if not exists _10thmreviews PARTITION OF reviewsphotos FOR VALUES FROM ('9000000') TO ('11000000');

\copy reviewsphotos(rating, recommend, response, body, date, reviewer_name, helpfulness, photos, reported, product_id) FROM '/Users/mywork/Documents/coding_projects/work/sdc/Reviews-Backend/db/allReviewsPhotos.csv' WITH DELIMITER ',' CSV HEADER;