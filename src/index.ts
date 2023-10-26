import express from 'express'
import usersRouter from './routes/users.routes'

const app = express()
const port = 3000

app.post('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/user', usersRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
