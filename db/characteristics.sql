CREATE TABLE if not exists partchars (
  characteristic_id serial PRIMARY KEY,
  name VARCHAR(255),
  value DECIMAL,
  product_id INTEGER
) PARTITION BY RANGE(characteristic_id);

CREATE TABLE if not exists _1stmchars PARTITION OF partchars FOR VALUES FROM ('1') TO ('1000000');

CREATE TABLE if not exists _2ndmchars PARTITION OF partchars FOR VALUES FROM ('1000000') TO ('2000000');

CREATE TABLE if not exists _3rdmchars PARTITION OF partchars FOR VALUES FROM ('2000000') TO ('3000000');

CREATE TABLE if not exists _4thmchars PARTITION OF partchars FOR VALUES FROM ('3000000') TO ('4000000');

CREATE TABLE if not exists _5thmchars PARTITION OF partchars FOR VALUES FROM ('4000000') TO ('5000000');

CREATE TABLE if not exists _6thmchars PARTITION OF partchars FOR VALUES FROM ('5000000') TO ('6000000');

CREATE TABLE if not exists _7thmchars PARTITION OF partchars FOR VALUES FROM ('6000000') TO ('7000000');

CREATE TABLE if not exists _8thmchars PARTITION OF partchars FOR VALUES FROM ('7000000') TO ('8000000');

CREATE TABLE if not exists _9thmchars PARTITION OF partchars FOR VALUES FROM ('8000000') TO ('9000000');

CREATE TABLE if not exists _10thmchars PARTITION OF partchars FOR VALUES FROM ('9000000') TO ('11000000');

\copy partchars(name, value, product_id) FROM '/Users/mywork/Documents/coding_projects/work/sdc/Reviews-Backend/db/characteristics.csv' WITH DELIMITER ',' CSV HEADER;