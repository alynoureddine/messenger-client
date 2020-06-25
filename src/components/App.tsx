import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import { Home } from './Home';
import { createMuiTheme, makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';


function App() {
  const prefersDarkMode: boolean = useMediaQuery('(prefers-color-scheme: dark)');

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


  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className={classes.App}>
          <Switch>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/register">
              <Register/>
            </Route>
            <Route path="/">
              <Home/>
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
