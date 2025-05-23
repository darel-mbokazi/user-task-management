import { Request, Response } from 'express'
import { getDBConnection } from '../models/db'

export const getTasksForUser = async (req: Request, res: Response) => {
  const userId = req.params.id
  const db = await getDBConnection()

  const tasks = await db.all('SELECT * FROM tasks WHERE userId = ?', userId)

  res.json(tasks)
}

export const createTaskForUser = async (req: Request, res: Response) => {
  const userId = req.params.id
  const { title } = req.body

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' })
  }

  const db = await getDBConnection()

  // Check if user exists
  const user = await db.get('SELECT * FROM users WHERE id = ?', userId)
  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  const result = await db.run(
    'INSERT INTO tasks (userId, title) VALUES (?, ?)',
    userId,
    title.trim()
  )

  const newTask = {
    id: result.lastID,
    userId: Number(userId),
    title
  }

  res.status(201).json(newTask)
}
