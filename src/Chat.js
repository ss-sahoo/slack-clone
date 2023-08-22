import styled from '@emotion/styled'
import React, { useEffect, useRef } from 'react'
import StarBorderIcon from "@mui/icons-material/StarBorder";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useSelector } from 'react-redux';
import { selectRoomId } from './features/appSlice';
import ChatInput from './ChatInput';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { db } from './firebase';
import { Timestamp } from 'firebase/firestore';
import Message from './Message';
function Chat() {
  const chatref=useRef(null);
    const roomId=useSelector(selectRoomId);
    const [roomDetails]=useDocument(
      roomId && db.collection("rooms").doc(roomId)
    )
    const [roomMessages,loading]=useCollection(
      roomId && db.collection('rooms').doc(roomId).collection('messages').orderBy("timestamp","asc")
    )
    useEffect(()=>{
      chatref?.current?.scrollIntoView({
        behavior:"smooth",
      });
    },[roomId,loading])
  return (
    <ChatContainer>
      {roomDetails && roomMessages && (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                <strong>#{roomDetails?.data().name}</strong>
              </h4>
              <StarBorderIcon />
            </HeaderLeft>
            <HeaderRight>
              <p>
                <InfoOutlinedIcon />
                Details
              </p>
            </HeaderRight>
          </Header>
          <ChatMessage>
            {roomMessages?.docs.map((doc) => {
              const { message, timestamp, user, userImage } = doc.data();
              return (
                <Message
                  key={doc.id}
                  message={message}
                  timestamp={timestamp}
                  user={user}
                  userImage={userImage}
                />
              );
            })}
            <ChatBottom ref={chatref} />
          </ChatMessage>

          <ChatInput
            chatref={chatref}
            channelName={roomDetails?.data().name}
            channelid={roomId}
          />
        </>
      )}
    </ChatContainer>
  );
}

export default Chat;
const Header=styled.div`
display: flex;
justify-content: space-between;
padding: 20px;
border-bottom: 1px solid lightgray;
`;
const HeaderLeft = styled.div`
display: flex;
align-items: center;
>h4{
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
}
>h4>.MuiSvgIcon-root{
   margin-left: 20px;
   font-size: 18px;
}
`;
const ChatBottom=styled.div`
padding-bottom: 200px;
`;
const HeaderRight = styled.div`
>p{
    display: flex;
    align-items: center;
    font-size: 14px;
}
>p>.MuiSvgIcon-root{
    font-size: 16px;
    margin-right: 5px !important;
}
`;
const ChatMessage=styled.div``;
const ChatContainer=styled.div`
flex: 0.7;
flex-grow: 1;
overflow-y: scroll;
margin-top: 60px;
`;