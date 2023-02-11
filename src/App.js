import "./App.css";
import NavBar from "./components/navBar/Navbar"
import { AccountBox } from "./pages/accountSignUp"
import { Cart } from "./pages/cartPage"
import { Home } from "../src/pages/index"
import { Route, Routes } from "react-router-dom"
import { AccountDetails } from "./pages/accountDetails"
import { ProductListing } from "./pages/createListing"
import { ChatPage } from './pages/chatPage'
import {ChatEngine} from 'react-chat-engine';

function App() {
  return (
<>
<NavBar/>
<div className='container'>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/cart" element={<Cart/>}/>
    <Route path="/accountSignUp" element={<AccountBox/>}/>
    <Route path="/accountDetails" element={<AccountDetails/>}/>
    <Route path="/createListing" element={<ProductListing/>}/>
    <Route path="/chat" element={<ChatPage/>}/>
  </Routes>
</div>
<ChatEngine
      userName='admin'//Put your userName instead
      projectID = '13d7df47-b545-4321-9815-fc39a027ee15'// Your project id goes here
      userSecret='admin'// Replace with your secret key
    />
</>
  );
}

export default App;
