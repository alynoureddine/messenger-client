import {Api, ApiResponse} from './api.service';
import {User} from '../store/users/types';

export const UsersRepository = {
  getUsers: (username: string): Promise<ApiResponse<User[]>> => Api.get(`users?username=${username}`),
};
