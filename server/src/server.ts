import express from 'express'
import userRoutes from './routes/userRoutes'
import taskRoutes from './routes/taskRoutes'
import bodyParser from 'body-parser'
import cors from 'cors'
const app = express()
const PORT = 3000

app.use(bodyParser.json())
app.use(cors())

app.use('/api', userRoutes)
app.use('/api', taskRoutes)

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`)
})
