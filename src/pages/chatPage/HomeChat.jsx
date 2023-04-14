import React from 'react'
import Sidebar from '../../components/chatComps/Sidebar'
import Chat from '../../components/chatComps/Chat'
import "./style.scss";

export const HomeChat = () => {
  return (
    <div className='chatHome'>
      <div className="chatContainer">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}

//export default HomeChat