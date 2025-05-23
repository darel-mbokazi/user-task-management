import express from 'express'
import userRoutes from './routes/userRoutes'
import taskRoutes from './routes/taskRoutes'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(
  cors({
    origin: ['https://user-task-management-five.vercel.app'],
    credentials: true,
  })
)

app.use('/api', userRoutes)
app.use('/api', taskRoutes)

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`)
})
