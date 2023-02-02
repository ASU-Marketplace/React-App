import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPerson } from '@fortawesome/free-solid-svg-icons'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link, useMatch, useResolvedPath} from "react-router-dom"
import logo from '../../images/asu.png'
import styled from "styled-components"

export default function NavBar(){
    const path = window.location.pathname

    return <nav className='nav'>

        <Link 
        to='/' className="siteTitle">
            <img src={logo} className="logo" />
            ASU Marketplace
        </Link>
        
    <ul>
        <CustomLink to="/cart">
            <FontAwesomeIcon className='navbarIcon' icon={faShoppingCart} />
            Cart
        </CustomLink>

        <CustomLink to="/account">
            <FontAwesomeIcon className='navbarIcon' icon={faPerson} />
            Account
        </CustomLink>
    </ul>
    </nav>
}

function CustomLink({to, children, ...props}){
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end : true})

    return(
        <li className={isActive ? "active" : ""}>
            <Link 
            to={to} {...props}>{children}
            </Link>
        </li> 
    )
}