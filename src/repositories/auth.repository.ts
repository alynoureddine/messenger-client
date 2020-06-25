import { LoginUserPayload, RegisterUserPayload, User } from '../store/auth/types';
import { Api, ApiResponse } from './api.service';

export const AuthRepository = {
  login: (user: LoginUserPayload): Promise<ApiResponse<User>> => Api.post('auth/login', user),
  register: (user: RegisterUserPayload): Promise<ApiResponse<User>> => Api.post('auth/register', user),
};
