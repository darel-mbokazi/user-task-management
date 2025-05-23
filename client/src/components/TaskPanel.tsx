import { useEffect, useState } from 'react'
import type { Task, User } from '../types'

interface Props {
  user: User
}

export default function TaskPanel({ user }: Props) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState('')

  const API_URL = import.meta.env.VITE_API_URL

  const fetchTasks = () => {
    fetch(`${API_URL}/users/${user.id}/tasks`)
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a: Task, b: Task) =>
          a.title.localeCompare(b.title)
        )
        setTasks(sorted)
      })
  }

  useEffect(() => {
    fetchTasks()
  }, [user])

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    await fetch(`${API_URL}/users/${user.id}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })

    setTitle('')
    fetchTasks()
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Tasks for <span className='text-red-600'>{user.name}</span>
      </h2>

      {tasks.length === 0 ? (
        <p className="text-gray-500 italic mb-4">
          No tasks found for this user.
        </p>
      ) : (
        <ul className="mb-4 space-y-1">
          {tasks.map((task) => (
            <li key={task.id} className="bg-white p-2 mb-4 font-semibold rounded shadow text-sm text-purple-900">
              {task.title}
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleAddTask} className="flex gap-2">
        <input
          type="text"
          placeholder="New task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded px-3 py-1 w-full"
        />
        <button
          type="submit"
          className="bg-green-500 text-white w-1/3 py-1 rounded disabled:opacity-50"
          disabled={!title.trim()}>
          Add Task
        </button>
      </form>
    </div>
  )
}
