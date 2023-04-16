import React, { Component, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSearch, faUser, faPlus, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import { Link, useMatch, useResolvedPath} from "react-router-dom";
import logo from '../../images/asu.png';
import './styles.css';
import Modal from "../accountReport";
import { auth } from "../../firebase";
import {signOut} from "firebase/auth";
import {
    collection,
    query,
    where,
    getDocs,
    setDoc,
    doc,
    updateDoc,
    serverTimestamp,
    getDoc,
  } from "firebase/firestore";
  import { db } from "../../firebase";

function NavBar(){
    const user = null; 
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); //change true or false depending if the user is logged in or out(true means logged in)
    const [searchTerm, setSearchTerm] = useState("");

    auth.onAuthStateChanged(function(user) {
        if (user) {
          setIsLoggedIn(true);
          //console.log("logged in");
        } else {
            setIsLoggedIn(false);
            //console.log("logged out");
        }
    });

    const handleSubmit = async (event) => {
        console.log("search term:" + searchTerm);
        // Perform search using the value in searchTerm
        const q = query(
            collection(db, "listings"),
            where("product.name", "==", searchTerm)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
          })
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.value);
        console.log(searchTerm);
        

        // if (searchTerm.length > 0) {
        //     countries.filter((country) => {
        //     return country.name.match(searchTerm);
        // });
    }

    const logout = async () => {
        await signOut(auth);
    };

    //Report an Account Modal
    const [modalOpen, setModalOpen] = useState(false);

    return <nav className='nav'>
        
        <Link 
        to='/' className="siteTitle">
            <img src={logo} className="logo" alt="img"/>
            ASU Marketplace
        </Link>

    <ul>
        {/* <form onSubmit={handleSubmit} className="search-form">
            <input 
                type="text" 
                placeholder="Search" 
                value={searchTerm} 
                onChange={(event) => handleSearch(event)} 
                className="search-input"
            />
            <button type="submit" className="search-button">
                <FontAwesomeIcon className='search-icon' icon={faSearch} />
            </button>
        </form> */}

        {isLoggedIn ? 
        <>
        <CustomLink to="/createListing">
            <FontAwesomeIcon className='navbarIcon' icon={faPlus} />
            Create Listing
        </CustomLink>

        <CustomLink to="/chat">
            <FontAwesomeIcon className='navbarIcon' icon={faEnvelope} />
            Inbox
        </CustomLink>

        <CustomLink to="/cart">
            <FontAwesomeIcon className='navbarIcon' icon={faHeart} />
            Saved
        </CustomLink>
        </>
        : 
        ""}

        <li className='account-items'
            onMouseEnter={() => setDropdownVisible(true)}
            onMouseLeave={() => setDropdownVisible(false)}>

        
            {isLoggedIn ? 
                <CustomLink to="/accountDetails">
                <>
                <FontAwesomeIcon className='navbarIcon' icon={faUser} />
                    My Account
                </>
                </CustomLink>
                : 
                <CustomLink  to="/accountSignUp">
                <>
                <div className="getting-started">
                    Get Started
                </div>
                </>
                </CustomLink>
                }

        {isDropdownVisible && isLoggedIn && (
            <div className={`dropdown-menu ${isDropdownVisible ? "is-visible" : ""}`}>
            <Link to="/listings" className="--">
                <div className="dropdown-item">My Listings</div>
            </Link>

            <Link to="" className="--"
                // onClick={() => {
                // setModalOpen(true);
                // }}
                >
                    {/* {modalOpen && <Modal setOpenModal={setModalOpen} />} */}
                <div className="dropdown-item">Report an Account</div>
            </Link>

            <Link to="/accountSignUp" onClick={logout}>
                <div className="dropdown-item-logout">Log Out </div>
            </Link>
            </div>
        )}
      </li>
    </ul>
    </nav>
}

export default NavBar;

function CustomLink({to, children, ...props}){
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end : true})

    return(
        <div className={isActive ? "active" : ""} >
            <Link id="customNavLinks"
            to={to} {...props}>{children}
            </Link>
        </div> 
    )
}

