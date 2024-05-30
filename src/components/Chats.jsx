import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      if (!currentUser?.uid) return;

      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        if (doc.exists()) {
          setChats(doc.data());
        } else {
          setChats([]);
        }
      });

      return () => {
        unsub();
      };
    };

    getChats();
  }, [currentUser?.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  console.log(chats);

  return (
    <div className="chats">
      {chats && Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
        <div
          className="userChat" 
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <p style={{background: '#5d5b8d', minWidth: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '100%'}}>
            {chat[1].userInfo?.displayName.charAt(0)}
          </p>
          <div style={{borderBottom: "1px solid gray", width: '100%'}} className="userChatInfo">
            <span>
              {chat[1].userInfo?.displayName || "Unknown"} 
              {chat[1].userInfo?.displayName === currentUser.displayName && <small> (you)</small>}
            </span>
            <p>{truncateText(chat[1].lastMessage?.text || "", 10)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
