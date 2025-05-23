import express from 'express'
import userRoutes from './routes/userRoutes'
import taskRoutes from './routes/taskRoutes'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(cookieParser())

app.use(
  cors({
    origin: ['https://user-task-management-five.vercel.app'],
    credentials: true,
  })
)

app.get('/', (req, res) => {
  res.send('Hello from Express on Vercel!')
})

app.use('/api', userRoutes)
app.use('/api', taskRoutes)

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`)
})
