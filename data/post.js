import db from "./data.js";

db.prepare(
  "CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, userId  INTEGER, title STRING, content STRING, FOREIGN KEY(userId) REFERENCES users(id))"
).run();
