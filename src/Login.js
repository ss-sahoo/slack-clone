import styled from '@emotion/styled'
import { Button } from '@mui/material';
import React from 'react'
import { auth, provider } from './firebase';

function Login() {
    const signIn=e=>{
        e.preventDefault();
        auth.signInWithPopup(provider).catch((error)=>{
            alert(error.message)
        })
    }
  return (
    <LoginContainer>
      <LoginInerContainer>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png"
          alt=""
        />
        <h1>Sign In to the  programming Zone</h1>
        <p>shradha21@slack.com</p>

        <Button  onClick={signIn}>Sign In with Google</Button>
      </LoginInerContainer>
    </LoginContainer>
  );
}

export default Login
const LoginContainer=styled.div`
background-color: #f8f8f8;
height: 100vh;
display: grid;
place-items:center;
`;
const LoginInerContainer = styled.div`
padding: 100px;
text-align: center;
background-color: white;
border-radius: 10px;
box-shadow: 0 1px 3px rgba(0,0,0,0.12),0 1px 2px rgba(0,0,0,0.24);
>img{
    object-fit: contain;
    height: 100px;
    margin-bottom: 40px;
}
>button{
    margin-top: 50px;
    text-transform:inherit !important;
    background-color: #0a8d48 !important;
    color: white;
}
`;