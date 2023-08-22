import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Header from './Header';
import styled from "@emotion/styled";
import Sidebar from './Sidebar';
import Chat from './Chat';
import { auth } from './firebase';
import {useAuthState} from 'react-firebase-hooks/auth'
import Login from './Login';
import Spinner from 'react-spinkit';

function App() {
  const[user,loading]=useAuthState(auth);
  if(loading){
    return (
      <AppLoading>
        <Appcontainer>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png"
            alt=""
          />
          <Spinner name='ball-spin-fade-loader'
            color="purple"
            fadeIn="none"
          />
        </Appcontainer>
      </AppLoading>
    );
  }
  return (
    <div>
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <Appbody>
              <Sidebar />
              <Routes>
                <Route path="/" element={<Chat />} />
              </Routes>
            </Appbody>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
const Appbody = styled.div`
  display: flex;
  height: 100vh;
`;
const AppLoading=styled.div`
display: grid;
place-items: center;
height: 100vh;
width: 100%;
`;
const Appcontainer = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`;