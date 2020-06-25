import { Api, ApiResponse } from './api.service';
import { Friend } from '../store/friends/types';

export const FriendsRepository = {
  getFriends: (): Promise<ApiResponse<Friend[]>> => Api.get('users/friends'),
};
