import React from 'react'
import Sidebar from '../../components/chatComps/Sidebar'
import Chat from '../../components/chatComps/Chat'

export const HomeChat = () => {
  return (
    <div className='home'>
      <div className="container">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}

//export default HomeChat