import "./App.css";
import NavBar from "./components/navBar/Navbar"
import { AccountBox } from "./pages/accountSignUp"
import { Cart } from "./pages/cartPage"
import { Home } from "../src/pages/index"
import { Route, Routes } from "react-router-dom"
import { AccountDetails } from "./pages/accountDetails"
import { ProductListing } from "./pages/createListing"
import { ChatPage } from './pages/chatPage'

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
</>
  );
}

export default App;
