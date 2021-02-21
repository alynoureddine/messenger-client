import { User } from '../store/auth/types';

export interface MessageResponse {
  id: number
  text: string
  chat: {id: number}
  date: string
  user: User,
}
