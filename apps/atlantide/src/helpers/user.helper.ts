import { User } from '@prisma/client'
import { IUserDto } from '../schemas/User'

export const toUserDto = (user: User): IUserDto => ({
  id: user.id,
  email: user.email,
  nickname: user.nickname,
  birthDate: user.birthDate,
  isAdmin: user.isAdmin,
  profilePictureUrl: user.profilePictureUrl,
  digit: user.digit,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt
})