import {Dispatch} from "redux";
import {FriendRequest, GetFriendRequestsAction, GetFriendsAction} from "../../store/friends/types";
import {useDispatch, useSelector} from "react-redux";
import {getFriendRequests, getFriends} from "../../store/friends/actions";
import React, {useEffect} from "react";
import {getFriendsState} from "../../store/selectors";
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import {FriendsRepository} from "../../repositories/friends.repository";
import {User} from "../../store/users/types";

export default function FriendRequestsList() {
  const dispatch: Dispatch<GetFriendRequestsAction | GetFriendsAction> = useDispatch();

  const friendRequests: FriendRequest[] = useSelector(getFriendsState).friendRequestsState.friendRequests;

  const handleReject = (id: number) => {
    FriendsRepository.rejectFriendRequest(id);
  }

  const handleAccept = async (id: number) => {
    await FriendsRepository.acceptFriendRequest(id);

    dispatch(getFriends())
  }

  useEffect(() => {
    dispatch(getFriendRequests());
  }, [dispatch]);

  return(
    <div>
      { friendRequests.map(({ id, user}: {id: number, user: User}) =>
        <div key={user.username}>
          {user.username}
          <CloseIcon onClick={() => handleReject(id)}/>
          <DoneIcon onClick={() => handleAccept(id)}/>
        </div>
      )}
    </div>
  );
}