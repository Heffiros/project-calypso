import Joi from 'joi'

export interface IUserLoginDto {
  email: string
  password: string
}

export interface IUserSignupDto {
  email: string
  password: string
  nickname: string,
  digit: number
}

export interface IUserDto {
  id: number
  email: string
  nickname: string
  birthDate: Date
  isAdmin: Boolean
  profilePictureUrl: string
  digit: number
  createdAt: Date
  updatedAt: Date
}

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
})

export const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  nickname: Joi.string().required(),
})
