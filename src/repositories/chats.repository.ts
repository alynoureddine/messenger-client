import {Api, ApiResponse} from './api.service';
import {Chat} from '../store/chats/types';

export const ChatsRepository = {
  getChatList: (): Promise<ApiResponse<Chat[]>> => Api.get('chats'),
  getChat: (id: number): Promise<ApiResponse<Chat>> => Api.get(`chats/${id}`),
  createChat: (friendId: number, message: string): Promise<ApiResponse<Chat>> => Api.post('chats', { friendId, message }),
};
