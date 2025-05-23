import type { User } from '../types'

interface Props {
  users: User[]
  selectedUser: User | null
  onSelectUser: (user: User) => void
}

export default function UserList({ users, selectedUser, onSelectUser }: Props) {
  return (
    <div className="space-y-2">
      {users.map((user) => (
        <button
          key={user.id}
          onClick={() => onSelectUser(user)}
          className={`block w-full text-left p-2 rounded
            ${
              selectedUser?.id === user.id
                ? 'bg-purple-900 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }
          `}>
          {user.name}
        </button>
      ))}
    </div>
  )
}
