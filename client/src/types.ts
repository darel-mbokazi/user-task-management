export interface User {
  id: number
  name: string
}

export interface Task {
  id: number
  userId: number
  title: string
}
