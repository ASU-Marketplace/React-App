import "./App.css";
import NavBar from "./components/navBar/Navbar"
import { AccountBox } from "./pages/accountSignUp"
import { Cart } from "./pages/cartPage"
import { Home } from "../src/pages/index"
import { Route, Routes, Navigate } from "react-router-dom"
import { AccountDetails } from "./pages/accountDetails"
import { ProductListing } from "./pages/createListing"
import { UserListing } from './pages/userListings'
import { ChatHome } from "./pages/chatPage/ChatHome";
import { HomeChat } from "./pages/chatPage/HomeChat";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { ExampleListings } from "./pages/exampleListings";


function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/accountSignUp" />;
    }

    return children
  };

  return (
<>

<NavBar/>
<div className='container'>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/cart" element={<Cart/>}/>
    <Route path="/accountSignUp" element={<AccountBox/>} />
    <Route path="/accountDetails" element={<AccountDetails/>} />
    <Route path="/createListing" element={<ProductListing/>}/>
    <Route path="/chat" element={<HomeChat/>}/>
    <Route path="/listings" element={<UserListing/>}/>
    <Route path="/exampleListings" element={<ExampleListings/>}/>
  </Routes>
</div>
</>
  );
}

export default App;