CREATE TABLE if not exists photos (
  id serial PRIMARY KEY,
  url VARCHAR(255),
  review_id INTEGER references reviews(review_id)
);

\copy photos(url, review_id) FROM '/Users/mywork/Documents/coding_projects/work/sdc/Reviews-Backend/db/allPhotos.csv' WITH DELIMITER ',' CSV HEADER;