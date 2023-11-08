import { Request, Response, NextFunction } from 'express'
import { body, checkSchema } from 'express-validator'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/Errors'
import usersService from '~/services/users.services'
import { validate } from '~/utils/validation'

export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body)
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      error: 'Missing email or password'
    })
  }
  next()
}

export const registerValidator = validate(
  checkSchema({
    name: {
      notEmpty: {errorMessage: USERS_MESSAGES.NAME_IS_REQUIRED},
      isString: {errorMessage: USERS_MESSAGES.NAME_MUST_BE_STRING},
      isLength: { options: { min: 1, max: 100 }, errorMessage: USERS_MESSAGES.NAME_LENGTH_MUST_BE_FROM_1_TO_100 },
      trim: true
    },
    email: {
      notEmpty: true,
      isEmail: true,
      trim: true,
      custom: {
        options: async (value) => {
          const result = await usersService.checkEmailExist(value)
          if (result) {
            throw new ErrorWithStatus({ message: 'Email already exist', status: 401 })
          }
          return true
        }
      }
    },
    password: {
      notEmpty: {errorMessage: USERS_MESSAGES.PASSWORD_IS_REQUIRED},
      isLength: { options: { min: 6, max: 50 }, errorMessage: USERS_MESSAGES.PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50 },
      isString: {errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_A_STRING},
      isStrongPassword: {
        options: {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
        },
        errorMessage:{errorMessage: USERS_MESSAGES.CONFIRM_PASSWORD_MUST_BE_STRONG}
      }
    },
    confirm_password: {
      notEmpty: {errorMessage: USERS_MESSAGES.PASSWORD_IS_REQUIRED},
      isLength: { options: { min: 6, max: 50 }, errorMessage: USERS_MESSAGES.PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50 },
      isString: {errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_A_STRING},
      isStrongPassword: {
        options: {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
        },
        errorMessage:{errorMessage: USERS_MESSAGES.CONFIRM_PASSWORD_MUST_BE_STRONG}
      },
      custom: {
        options: (value, { req }) => {
          if (value !== req.body.password) {
            throw new Error('password confirmation does not match password')
          }
          return true
        }
      }
    },
    date_of_birth: {
      isISO8601: {
        options: {
          strict: true,
          strictSeparator: true
        },
        errorMessage: USERS_MESSAGES.DATE_OF_BIRTH_MUST_BE_ISO8601
      }
    }
  })
)
