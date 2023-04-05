import React, { useContext, useState } from 'react'
import {onAuthStateChanged, signOut} from "firebase/auth"
import { auth } from '../../firebase'
import { AuthContext } from '../../context/AuthContext'

const ChatNavbar = () => {
  //const {currentUser} = useContext(AuthContext)
  const [currentUser, setCurrentUser] = useState("");

  onAuthStateChanged(auth, (currentUser) => {
    setCurrentUser(currentUser);
  });

  return (
    <div className='chatNavbar' >
      <span className="chatTitle">ASU Marketplace Chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
      </div>
    </div>
  )
}

export default ChatNavbar