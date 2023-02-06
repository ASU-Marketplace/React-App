import "./App.css";
import styled from "styled-components";
import NavBar from "./components/navBar/Navbar"
import { AccountBox } from "./pages/accountSignUp"
import { Cart } from "./pages/cartPage"
import { Home } from "../src/pages/index"
import { Route, Routes } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function App() {
  return (
<>
<NavBar/>
<div className='container'>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/cart" element={<Cart/>}/>
    <Route path="/account" element={<AccountBox/>}/>
  </Routes>
</div>
</>
  );
}

export default App;
