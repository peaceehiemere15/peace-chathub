import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (data.chatId) {
      const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        const messagesData = doc.exists() ? doc.data()?.messages || [] : [];
        setMessages(messagesData);
      });

      return () => {
        unSub();
      };
    }
  }, [data.chatId]);

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div style={{scrollbarWidth: 'none', height: data?.user?.displayName ? '72%' : '83.5%', overflowY: 'auto' }} className="messages">
      {messages.map((m) => (
        <Message
          bg={m.senderId === currentUser.uid ? '#e0f7fa' : '#f0f0f0'}
          align={m.senderId === currentUser.uid ? 'right' : 'left'}
          name={m.senderId === currentUser.uid ? data.user.displayName.charAt(0) : currentUser.displayName.charAt(0) }
          message={m}
          key={m.id}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
