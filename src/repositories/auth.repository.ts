import { LoginUserPayload, RegisterUserPayload, AuthUser } from '../store/auth/types';
import { Api, ApiResponse } from './api.service';

export const AuthRepository = {
  login: (user: LoginUserPayload): Promise<ApiResponse<AuthUser>> => Api.post('auth/login', user),
  register: (user: RegisterUserPayload): Promise<ApiResponse<AuthUser>> => Api.post('auth/register', user),
  me: (): Promise<ApiResponse<AuthUser>> => Api.get('auth/me'),
};
