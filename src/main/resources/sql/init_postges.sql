DROP TABLE IF EXISTS todo;
DROP SEQUENCE IF EXISTS todo_seq CASCADE;

CREATE SEQUENCE todo_seq START 1;

CREATE TABLE todo (
  id            INTEGER PRIMARY KEY DEFAULT nextval('todo_seq'),
  task          VARCHAR,
  is_finished   BOOL
);