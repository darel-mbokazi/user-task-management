import { useState } from 'react'

interface Props {
  onUserCreated: () => void
}

export default function UserForm({ onUserCreated }: Props) {
  const [name, setName] = useState('')

  const API_URL = import.meta.env.VITE_API_URL

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })

    setName('')
    onUserCreated()
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Enter user name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded px-3 py-1 w-full"
      />
      <button
        type="submit"
        className="bg-purple-900 text-white w-1/3 py-1 rounded disabled:opacity-50"
        disabled={!name.trim()}>
        Add User
      </button>
    </form>
  )
}
