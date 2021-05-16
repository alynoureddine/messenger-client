import React from 'react';
import './App.css';
import {makeStyles, Theme} from '@material-ui/core/styles';
import {useSelector} from "react-redux";
import {getAuthState} from "../store/selectors";
import {User} from "../store/users/types";

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'center',
    height: 75,
  },
  name: {
    margin: 'auto 0 auto 0',
  }
}));

function Header() {
  const classes = useStyles();
  const authState: User = useSelector(getAuthState).user;

  return (
    <div className={classes.header}>
      <div className={classes.name}>{`${authState.firstName} ${authState.lastName}`}</div>
    </div>
  )
}

export default Header;
