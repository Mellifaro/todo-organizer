DROP TABLE IF EXISTS todo;

CREATE TABLE todo (
  id            INTEGER PRIMARY KEY AUTO_INCREMENT,
  task          VARCHAR,
  is_finished   BOOLEAN
);