import React, { useContext } from "react";
import Cam from "../img/cam.png";
// import {ADD} from "../img/add.png"
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data?.user?.displayName || "pick a chat"}</span>
        <div className="chatIcons">
          {/* <img src={ADD} alt="Add icon" /> */}
          <img src={More} alt="More icon" />
        </div>
      </div>
      <Messages />
      { data?.user?.displayName && <Input />}
    </div>
  );
};

export default Chat;
