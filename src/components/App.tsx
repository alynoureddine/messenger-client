import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect, useLocation} from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import {Home} from './Home';
// The stable version currently has some issues in strict mode. https://github.com/mui-org/material-ui/issues/13394
import {
  makeStyles,
  Theme,
  ThemeProvider,
  unstable_createMuiStrictModeTheme as createMuiTheme
} from '@material-ui/core/styles';
import {useMediaQuery} from '@material-ui/core';
import {useDispatch, useSelector} from "react-redux";
import {getAuthState} from "../store/selectors";
import {Dispatch} from "redux";
import {getLoggedInUser} from "../store/auth/actions";


function App() {
  const loggedIn: boolean = useSelector(getAuthState).loggedIn;
  const prefersDarkMode: boolean = useMediaQuery('(prefers-color-scheme: dark)');
  const pathname = useLocation().pathname;
  const redirectTo = new URLSearchParams(useLocation().search).get('redirectTo');


  const theme: Theme = createMuiTheme({
    palette: {
      type: prefersDarkMode ? 'dark' : 'light',
    },
  });

  const useStyles = makeStyles(() =>({
    App: {
      backgroundColor: theme.palette.background.default,
      height: '100%',
    }
  }));

  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoggedInUser());
  }, [dispatch, loggedIn])

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.App}>
        <Switch>
          <Route path="/login">
            {loggedIn ? <Redirect to={redirectTo ?? '/'} /> : <Login />}
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/">
            {loggedIn ? <Home /> : <Redirect to={`/login?redirectTo=${pathname}`} />}
          </Route>
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
