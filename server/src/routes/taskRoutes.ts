import express from 'express'
import {
  getTasksForUser,
  createTaskForUser,
} from '../controllers/taskController'

const router = express.Router()

router.get('/users/:id/tasks', getTasksForUser) 
router.post('/users/:id/tasks', createTaskForUser) 

export default router
