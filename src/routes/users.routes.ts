import { Router } from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import { loginValidator } from '~/middlewares/users.middlewares'
const usersRouter = Router()

//middleware xu li before
// usersRouter.use((req, res, next) => {
//   console.log('Time', Date.now())
//   next()
// }),
usersRouter.post('/login', loginValidator, loginController)
usersRouter.post('/register', registerController)

export default usersRouter
