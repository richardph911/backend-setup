import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import { USERS_MESSAGES } from '~/constants/messages'
import { RegisterReqBody } from '~/models/requests/User.requests'
import User from '~/schemas/User.schema'
import databaseService from '~/services/database.services'
import usersService from '~/services/users.services'

// export const loginController = (req: Request, res: Response) => {
//   const { email, password } = req.body
//   if (email === 'hoangtudauphong@gmail.com' && password === '123456') {
//     return res.json({
//       message: 'Login Sucess'
//     })
//   }
//   return res.status(400).json({ error: 'login failed' })
// }
//need userid --> db.users.findone()
export const loginController = async (req: Request, res: Response) => {
  const user = req.user as User
  const user_id = user._id as ObjectId
  const result = await usersService.login(user_id.toString())
  return res.json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    result
  })
}

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  // const { email, password } = req.body
  //call database service to interset into it
  try {
    const result = await usersService.register(req.body)
    console.log(result)
    return res.json({
      message: USERS_MESSAGES.REGISTER_SUCCESS,
      result
    })
  } catch (error) {
    return res.status(400).json({
      message: 'register failed',
      error
    })
  }
}
