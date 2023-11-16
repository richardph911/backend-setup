import { config } from 'dotenv'
import jwt from 'jsonwebtoken'
// import { TokenPayload } from '~/models/requests/User.requests'
config()

//jwt.sign(payload, secretOrPrivateKey, [options, callback])

export const signToken = ({
  payload,
  privateKey = process.env.JWT_SECRET as string,
  options = { algorithm: 'HS256' }
}: {
  payload: string | Buffer | object
  privateKey?: string
  options?: jwt.SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (error, token) => {
      if (error) {
        throw reject(error)
      }
      resolve(token as string)
    })
  })
}

//verify( token, secretorpublickey, payload, custom)
export const verifyToken = ({ token, secretOrPublicKey = process.env.JWT_SECRET as string }: { token: string, secretOrPublicKey?: string }) => {
  return new Promise<jwt.JwtPayload>((resolve, reject) => {
    jwt.verify(token, secretOrPublicKey, (error, decoded) => {
      if (error) {
        throw reject(error)
      }
      resolve(decoded as jwt.JwtPayload)
    })
  })
}
