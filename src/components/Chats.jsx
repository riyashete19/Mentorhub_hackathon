import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = async () => {
      if (!currentUser || !currentUser.uid) return;

      const q = query(
        collection(db, "userChats", currentUser.uid),
        orderBy("date", "desc")
      );

      const unsub = onSnapshot(q, (snapshot) => {
        const updatedChats = [];
        snapshot.forEach((doc) => {
          updatedChats.push(doc.data());
        });
        setChats(updatedChats);
      });

      return () => {
        unsub();
      };
    };

    getChats();
  }, [currentUser]);

  const handleSelect = (userInfo) => {
    dispatch({ type: "CHANGE_USER", payload: userInfo });
  };

  return (
    <div className="chats">
      {chats.map((chat, index) => (
        <div
          className="userChat"
          key={index}
          onClick={() => handleSelect(chat.userInfo)}
        >
          <img src={chat.userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat.userInfo.displayName}</span>
            <p>{chat.lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
