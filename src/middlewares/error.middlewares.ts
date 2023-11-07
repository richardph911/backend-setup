import { Request, Response, NextFunction } from 'express'
import HTTP_STATUS from '~/constants/httpStatus'
import { omit } from 'lodash'

export const defautErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  return res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json(omit(err, ['status']))
}
