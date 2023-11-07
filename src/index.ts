import express from 'express'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
import { defautErrorHandler } from './middlewares/error.middlewares'

databaseService.connectDB()
const app = express()
const port = 3000
app.use(express.json()) //app handler, middleware parse json thanh object

app.use('/users', usersRouter) //app handler
app.use(defautErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
