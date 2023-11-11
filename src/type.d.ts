import { Request } from 'express'
import User from "./schemas/User.schema"

declare module 'express'{
  interface Request {
    user?: User
  }
}