import { Router } from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import { accessTokenValidator, loginValidator, registerValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handler'
import { validate } from '~/utils/validation'
const usersRouter = Router()

//middleware xu li before
// usersRouter.use((req, res, next) => {
//   console.log('Time', Date.now())
//   next()
// }),
/**
 * description: login
 * path: /login
 * method: POST
 * body: {email: string, password: string}
 */
usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController))
/**
 * description: register a new user, using checkSchema in express-validator
 * path: /register
 * method: POST
 * body: {name: string, email: string, password: string, confirm-password: string, date_of_birth: ISO8601}
 */
usersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))

/**
 * description: logout
 * path: /logout
 * method: POST
 * header: {Authorization: Beaer <access_token> } user A just A can logout
 * body: { refresh_token: string} login save refresh and logout to delete that token
 * hit button, validate verify access_token then return decoded_authorization in  { req } has user id
 */
usersRouter.post('/logout', accessTokenValidator, wrapRequestHandler((req, res) =>{
  res.json({message: 'Logout Successfully'})
  })
)
export default usersRouter
