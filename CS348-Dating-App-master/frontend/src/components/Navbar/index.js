import {React, useContext} from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";
import '../../styles/nav.css'
import {userContext} from '../../contexts/userContext';
import { BsFillGearFill } from "react-icons/bs";

const Navbar = () => {
  const {user, setUser, setUserId, setFirst_Name, first_Name} = useContext(userContext);
  
  const handleLogout = () => {
    localStorage.setItem("user", "");
    localStorage.setItem("userid", -1);
    localStorage.setItem("firstName", "");
    setUser("");
    setFirst_Name("")
    setUserId(-1);
  }

  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to='/' activeStyle>
            <b>Binder</b>
          </NavLink>
          {user ? null:<NavLink to="/sign-up" activeStyle>
            Sign Up
          </NavLink>}
          {user ? <NavLink to="/profiles" activeStyle>
            Profiles
          </NavLink>:null}
          {user ? <NavLink to="/conversations">Conversations</NavLink>: null}
          {user ? <NavLink to="/datinghistory">Dating History</NavLink>: null}

          
          {user ? <NavLink>Hi {first_Name}</NavLink>:<NavLink to="/login">Log In</NavLink>}
          
          {user ? <NavLink to="/settings" activeStyle>
          <BsFillGearFill/>
          </NavLink>:null}

          {user ? <NavLink to='/' onClick={handleLogout}>Sign Out</NavLink> : null}
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;