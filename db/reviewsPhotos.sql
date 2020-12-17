CREATE TABLE if not exists newreviews (
  review_id serial,
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

CREATE TABLE if not exists _1streviews PARTITION OF newreviews FOR VALUES FROM ('0') TO ('1000000');

CREATE TABLE if not exists _2ndreviews PARTITION OF newreviews FOR VALUES FROM ('1000000') TO ('2000000');

CREATE TABLE if not exists _3rdreviews PARTITION OF newreviews FOR VALUES FROM ('2000000') TO ('3000000');

CREATE TABLE if not exists _4threviews PARTITION OF newreviews FOR VALUES FROM ('3000000') TO ('4000000');

CREATE TABLE if not exists _5threviews PARTITION OF newreviews FOR VALUES FROM ('4000000') TO ('5000000');

CREATE TABLE if not exists _6threviews PARTITION OF newreviews FOR VALUES FROM ('5000000') TO ('6000000');

CREATE TABLE if not exists _7threviews PARTITION OF newreviews FOR VALUES FROM ('6000000') TO ('7000000');

CREATE TABLE if not exists _8threviews PARTITION OF newreviews FOR VALUES FROM ('7000000') TO ('8000000');

CREATE TABLE if not exists _9threviews PARTITION OF newreviews FOR VALUES FROM ('8000000') TO ('9000000');

CREATE TABLE if not exists _10threviews PARTITION OF newreviews FOR VALUES FROM ('9000000') TO ('20000000');

\copy newreviews(rating, recommend, response, body, date, reviewer_name, helpfulness, photos, reported, product_id) FROM '/Users/mywork/Documents/coding_projects/work/sdc/Reviews-Backend/db/all.csv' WITH DELIMITER ',' CSV HEADER;