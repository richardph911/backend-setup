import express from 'express'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
const app = express()
const port = 3000
app.use(express.json()) //app handler, middleware parse json thanh object
databaseService.connectDB()

app.use('/users', usersRouter) //app handler

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
