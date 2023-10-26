import { Router } from 'express'
const usersRouter = Router()

//middleware xu li before
usersRouter.use((req, res, next) => {
  console.log('Time', Date.now())
  next()
}),
  usersRouter.get('/tweets', (req, res) => {
    res.json({
      data: [
        { id: 1, text: 'Hello Dung' },
        { id: 2, text: 'SWE' }
      ]
    })
  })

export default usersRouter
