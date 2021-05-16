import React, {useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Grid} from '@material-ui/core';
import {ChatSection} from './chat/Chat';
import {LeftSection} from './LeftSection';
import {getFriends} from '../store/friends/actions';
import {Dispatch} from 'redux';
import {useDispatch} from 'react-redux';
import io from "socket.io-client";
import {store} from '../index';
import {socketSaga} from '../store/sagas';
import {NewChatSection} from "./chat/NewChatSection";
import Header from "./Header";

export function Home() {

  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    const socket: SocketIOClient.Socket = io('http://localhost:8080', {transports: ['websocket']});
    socket.on('connect', () => {
      dispatch(getFriends());
    });

    store.runSaga(socketSaga, socket);
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div style={{height: '100%'}}>
        <Grid container style={{height: '100%'}}>
          <Grid item md={12} xs={12}>
            <Header />
          </Grid>
          <Grid item md={3} xs>
            <Switch>
              <Route path="/">
                <LeftSection/>
              </Route>
            </Switch>
          </Grid>
          <Grid item style={{borderLeft: 'solid 1px', height: '100%'}} xs>
            <Switch>
              <Route path="/chats/new/:friendId" children={<NewChatSection/>}/>
            </Switch>
            <Switch>
              <Route path="/chats/:id" children={<ChatSection/>}/>
            </Switch>
          </Grid>
        </Grid>
      </div>
    </BrowserRouter>
  )
}
