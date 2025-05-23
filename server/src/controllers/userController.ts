import { Request, Response } from 'express'
import { getDBConnection } from '../models/db'

export const getAllUsers = async (_req: Request, res: Response) => {
  const db = await getDBConnection()
  const users = await db.all('SELECT * FROM users')
  res.json(users)
}

export const createUser = async (req: Request, res: Response) => {
  const { name } = req.body

  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Name is required' })
  }

  const db = await getDBConnection()
  const result = await db.run(
    'INSERT INTO users (name) VALUES (?)',
    name.trim()
  )

  const newUser = { id: result.lastID, name }
  res.status(201).json(newUser)
}
