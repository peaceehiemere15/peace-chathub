import React, { useContext } from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import { ChatContext } from "../context/ChatContext";

const Sidebar = () => {
  const { dispatch } = useContext(ChatContext);

  // Define handleSelect function to dispatch action for changing user in chat context
  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  return (
    <div className="sidebar">
      <Navbar />
      {/* Pass handleSelect function as a prop to the Search component */}
      <Search handleSelect={handleSelect} />
      <Chats />
    </div>
  );
};

export default Sidebar;
