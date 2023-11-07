export enum UserVerifyStatus {
  Unverified, // default = 0
  Verified, // 1
  Banned // 2
}

export enum TokenType {
  AccessToken,
  RefreshToken,
  ForgotPasswordToken,
  EmailVerifyToken
}
