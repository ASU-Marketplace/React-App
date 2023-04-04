import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../../firebase'
import { AuthContext } from '../../context/AuthContext'

const ChatNavbar = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className='chatNavbar' >
      <span className="logo">ASU Marketplace Chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="profile pic" />
        <span>{currentUser.displayName}</span>
      </div>
    </div>
  )
}

export default ChatNavbar