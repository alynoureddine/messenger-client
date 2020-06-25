import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { FriendList } from './FriendList';
import { Chat } from './Chat';


export function Home() {
  return (
    <div style={{height: '100%'}}>
      <Grid container style={{height: '100%'}} >
        <Grid item  md={3} xs>
          <BrowserRouter>
            <Switch>
              <Route path="/">
                <FriendList/>
              </Route>
            </Switch>
          </BrowserRouter>
        </Grid>
        <Grid item style={{borderLeft: 'solid 1px', height: '100%'}} xs>
          <BrowserRouter>
            <Switch>
              <Route path="/chat">
                <Chat/>
              </Route>
            </Switch>
          </BrowserRouter>
        </Grid>
      </Grid>
    </div>
  )
}
