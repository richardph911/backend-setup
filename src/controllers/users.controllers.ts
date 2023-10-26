import { Request, Response } from 'express'

export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === 'hoangtudauphong@gmail.com' && password === '123456') {
    return res.json({
      message: 'Login Sucess'
    })
  }
  return res.status(400).json({ error: 'login failed' })
}
