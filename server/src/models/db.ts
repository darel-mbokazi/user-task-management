import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export const getDBConnection = async () => {
  const db = await open({
    filename: './database.db',
    driver: sqlite3.Database,
  })

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );
  `)

  await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      title TEXT NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id)
    );
  `)

  return db
}
