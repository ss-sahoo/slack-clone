import styled from '@emotion/styled';
import { Button } from '@mui/material';
import React, { useRef, useState } from 'react'
import firebase from 'firebase/compat/app';
import { auth, db } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function ChatInput({channelName,channelid,chatref}) {
    const [input,setInput]=useState("")
    const [user]=useAuthState(auth);
    const sendMessage=e=>{
        e.preventDefault();
        if(!channelid){
            return false
        }
        db.collection("rooms").doc(channelid).collection("messages").add({
          message: input,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          user: user.displayName,
          userImage:
           user.photoURL,
        });
         chatref?.current?.scrollIntoView({
        behavior:"smooth",
         });
        setInput("");
    }
  return (
    <ChatInputContainer>
    <form>
        <input value={input} onChange={e=>setInput(e.target.value)} placeholder={`Message #${channelName}`} />
        <Button hidden type='submit' onClick={sendMessage}>
            Send
        </Button>
    </form>
      
    </ChatInputContainer>
  )
}

export default ChatInput;
const ChatInputContainer=styled.div`
border-radius: 20px;
>form{
    position: relative;
    display: flex;
    justify-content: center;
}
>form>input{
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
}
>form>Button{
    display: none !important;
}
`;
