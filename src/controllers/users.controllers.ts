import { Request, Response } from 'express'
import User from '~/schemas/User.schema'
import databaseService from '~/services/database.services'
import usersService from '~/services/users.services'

export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === 'hoangtudauphong@gmail.com' && password === '123456') {
    return res.json({
      message: 'Login Sucess'
    })
  }
  return res.status(400).json({ error: 'login failed' })
}
export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body
  //call database service to interset into it
  try {
    const result = await usersService.register({ email, password })
    console.log(result)
    return res.json({
      message: 'Register successfully',
      result
    })
  } catch (error) {
    return res.status(400).json({
      message: 'register failed',
      error
    })
  }
}
