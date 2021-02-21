import {Api, ApiResponse} from './api.service';
import {Friend} from '../store/friends/types';
import {User} from "../store/users/types";

export type GetFriendRequestResponseType = {
  id: number,
  requester: User,
  status: string,
}

export const FriendsRepository = {
  getFriends: (): Promise<ApiResponse<Friend[]>> => Api.get('users/friends'),
  createFriendRequest: (friendRequest: { username: string }): Promise<ApiResponse<null>> => Api.post('friend-requests', friendRequest),
  getFriendRequests: (): Promise<ApiResponse<User[]>> => Api.get('friend-requests'),
  acceptFriendRequest: (id: number): Promise<ApiResponse<GetFriendRequestResponseType>> => Api.put(`friend-requests/${id}/accept`),
  rejectFriendRequest: (id: number): Promise<ApiResponse<GetFriendRequestResponseType>> => Api.put(`friend-requests/${id}/decline`),
};
