import React, {ChangeEvent, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import {Autocomplete, AutocompleteRenderInputParams} from "@material-ui/lab";
import {TextField, Theme} from "@material-ui/core";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {getUsersState} from "../../store/selectors";
import {User} from "../../store/users/types";
import {getUsers} from "../../store/users/actions";
import {createFriendRequest} from "../../store/friends/actions";

export default function AddFriendModal() {
  const [open, setOpen]: [boolean, (open: boolean) => void] = React.useState<boolean>(false);
  const [username, setUsername]: [string, (username: string) => void] = React.useState<string>('');
  const theme: Theme = useTheme();
  const fullScreen: boolean = useMediaQuery(theme.breakpoints.down('sm'));

  const dispatch: Dispatch = useDispatch();
  const users: User[] | undefined = useSelector(getUsersState).users;

  useEffect(() => {
    dispatch(getUsers(username))
  }, [dispatch, username]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Friend
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Add Friend"}</DialogTitle>

        <DialogContent>
          <Autocomplete
            options={users.map(({username}: { username: string })=> ({username}))}
            getOptionSelected={(option: { username: string }, value: { username: string }) => option.username === value.username}
            getOptionLabel={(option: { username: string }) => option.username}
            style={{ width: 300 }}
            renderInput={(params: AutocompleteRenderInputParams) => <TextField {...params} label="username" variant="outlined" />}
            onInputChange={(_: ChangeEvent<{}>, value: string) => setUsername(value)}
          />
          <Button variant="outlined" color="primary" onClick={() => dispatch(createFriendRequest(username))}>
            Add Friend
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
