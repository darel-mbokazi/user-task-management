import { useEffect, useState } from 'react'
import UserForm from './components/UserForm'
import UserList from './components/UserList'
import TaskPanel from './components/TaskPanel'
import type { User } from './types'

export default function App() {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [userSort, setUserSort] = useState<'alpha' | 'created'>('alpha')

  const fetchUsers = async () => {
    const res = await fetch('http://localhost:3000/api/users')
    const data: User[] = await res.json()

    if (userSort === 'alpha') {
      data.sort((a, b) => a.name.localeCompare(b.name))
    }

    setUsers(data)
    if (data.length && !selectedUser) {
      setSelectedUser(data[0])
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [userSort])

  const handleUserCreated = () => {
    fetchUsers()
  }

  return (
    <div className="h-screen p-6">
      <h1 className="text-3xl text-center text-red-600 font-bold mb-10">
        User Task Manager
      </h1>

      <div className="flex max-sm:grid gap-10">
        {/* Left Column */}
        <div className="w-1/2 overflow-y-auto max-sm:w-full">
          <h2 className="text-2xl font-bold mb-4">Users</h2>
          <UserForm onUserCreated={handleUserCreated} />

          <div className="mb-5">
            <label className="text-sm mr-2 font-medium text-red-600">
              Sort users:
            </label>
            <select
              value={userSort}
              onChange={(e) =>
                setUserSort(e.target.value as 'alpha' | 'created')
              }
              className="border rounded px-2 py-1 text-sm">
              <option value="alpha">Alphabetical</option>
              <option value="created">Creation Order</option>
            </select>
          </div>

          {users.length === 0 ? (
            <p className="text-gray-500 italic">
              No users found. Add one above.
            </p>
          ) : (
            <UserList
              users={users}
              selectedUser={selectedUser}
              onSelectUser={setSelectedUser}
            />
          )}
        </div>

        {/* Right Column */}
        <div className="w-1/2 overflow-y-auto max-sm:w-full">
          <h2 className="text-2xl font-bold mb-4">Tasks</h2>
          {selectedUser ? (
            <TaskPanel user={selectedUser} />
          ) : (
            <p className="text-gray-500 italic">
              Select a user to view their tasks.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
