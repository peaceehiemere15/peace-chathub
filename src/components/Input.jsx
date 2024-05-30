import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuid } from "uuid";

const Input = () => {
  const [text, setText] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      console.log("Message is empty");
      return; // Don't send if the input is empty or contains only spaces
    }

    
      setText("");

    try {
      const chatDocRef = doc(db, "chats", data.chatId);
      const chatDocSnapshot = await getDoc(chatDocRef);

      // Generate a timestamp
      const timestamp = Timestamp.now();

      // Message object
      const message = {
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: timestamp,
      };

      if (chatDocSnapshot.exists()) {
        // Document exists, update it
        await updateDoc(chatDocRef, {
          messages: arrayUnion(message),
        });
      } else {
        // Document doesn't exist, create it
        await setDoc(chatDocRef, {
          messages: [message],
        });
      }

      // Update userChats for the current user
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [`${data.chatId}.lastMessage`]: {
          text,
        },
        [`${data.chatId}.date`]: timestamp,
        [`${data.chatId}.userInfo`]: {
          uid: data.user.uid,
          displayName: data.user.displayName,
        },
      });

      // Update userChats for the other user
      await updateDoc(doc(db, "userChats", data.user.uid), {
        [`${data.chatId}.lastMessage`]: {
          text,
        },
        [`${data.chatId}.date`]: timestamp,
        [`${data.chatId}.userInfo`]: {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
        },
      });

      // Clear the input after sending the message
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  return (
    <form onSubmit={handleSend} className="input">
      <input
        type="text"
        placeholder="type to chat..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <button type="submit">Send</button>
      </div>
    </form>
  );
};

export default Input;
