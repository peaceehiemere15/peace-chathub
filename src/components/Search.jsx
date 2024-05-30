import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from '../context/AuthContext';

const Search = ({ handleSelect }) => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);

  let delayTimer;

  const handleSearch = (e) => {
    clearTimeout(delayTimer);
    const searchTerm = e.target.value.trim();
    setUsername(searchTerm);
    delayTimer = setTimeout(async () => {
      const q = query(
        collection(db, "users"),
        where("displayName", "==", searchTerm)
      );

      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const foundUsers = querySnapshot.docs.map(doc => doc.data());
          const filteredUser = foundUsers.filter(user =>
            user.displayName.toLowerCase().includes(searchTerm.toLowerCase())
          );
          if (filteredUser.length > 0) {
            setUser(filteredUser);
            setErr(false);
          } else {
            setUser(null);
            setErr(true);
          }
        } else {
          setUser(null);
          setErr(true);
        }
      } catch (err) {
        console.error("Error searching for user: ", err);
        setErr(true);
      }
    }, 100); // Adjust the delay time here (in milliseconds)
  };

  const handleSelectFromSearch = async (selectedUser) => {
    // Assuming `handleSelect` is a function passed as a prop
    handleSelect(selectedUser);
    setUser(null);
    setUsername("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user" 
          onChange={handleSearch}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && user.map((userData) => (
        <div key={userData.uid} className="userChat" onClick={() => handleSelectFromSearch(userData)}>
          <div className="userChatInfo">
            <span>{userData.displayName} {currentUser.displayName === userData.displayName && userData.displayName === username && <small>(you)</small>}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Search;
