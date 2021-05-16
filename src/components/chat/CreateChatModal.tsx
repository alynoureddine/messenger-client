import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import {FriendList} from '../friend/FriendList';
import {Chat, ChatsState} from "../../store/chats/types";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {getChatsState} from "../../store/selectors";

export default function CreateChatModal() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();
  const chatState: ChatsState = useSelector(getChatsState);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFriendClick = (friendId: number) => {
    handleClose();

    let chat: Chat | undefined = chatState.list.find((chat: Chat) =>
      (chat.users[0].id === friendId || chat.users[1].id === friendId)
    );

    if (chat) {
      history.push(`/chats/${chat.id}`);

      return;
    }

    history.push(`/chats/new/${friendId}`);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        New Chat
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"New Chat"}</DialogTitle>

        <DialogContent>
          <FriendList handleFriendClick={handleFriendClick} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

