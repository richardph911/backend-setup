import { Router } from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares'
import { validate } from '~/utils/validation'
const usersRouter = Router()

//middleware xu li before
// usersRouter.use((req, res, next) => {
//   console.log('Time', Date.now())
//   next()
// }),
usersRouter.post('/login', loginValidator, loginController)
/**
 * description: register a new user, using checkSchema in express-validator
 * path: /register
 * method: POST
 * body: {name: string, email: string, password: sgring, confirm-password: string, date_of_birth: ISO8601}
 */
usersRouter.post('/register', registerValidator, registerController)

export default usersRouter
