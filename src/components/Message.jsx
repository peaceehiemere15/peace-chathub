import React from "react";

const Message = ({ name, bg, align, message }) => {
  return (
    <div style={{display: 'flex', justifyContent: align}} className="message">
      <div className="messageInfo">
        <p style={{ backgroundColor: '#5d5b8d', width: '25px', height: '25px', borderRadius: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>{ name }</p>
        <span>{message.senderDisplayName}</span>
      </div>
      <div className="messageContent">
        <p style={{backgroundColor: bg}}>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
