import express from 'express'
import usersRouter from './routes/users.routes'

const app = express()
const port = 3000
app.use(express.json()) //app handler, middleware parse json thanh object

// app.post('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use('/users', usersRouter) //app handler

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
