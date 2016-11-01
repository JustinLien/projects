-- CREATE jobqueue
DROP DATABASE IF EXISTS jobqueue;
CREATE DATABASE jobqueue;

\c jobqueue;

CREATE TABLE urls (
  ID SERIAL PRIMARY KEY,
  url VARCHAR,
  data TEXT DEFAULT 'Fetching URL...'
);
