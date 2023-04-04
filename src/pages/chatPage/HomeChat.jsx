import React from 'react'
import Sidebar from '../../components/chatComps/Sidebar'
import Chat from '../../components/chatComps/Chat'
import "./style.css";

export const HomeChat = () => {
  return (
    <div className='chatHome'>
      <div className="container">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}

//export default HomeChat