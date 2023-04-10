import React, {useState} from "react";
import {Link} from 'react-router-dom';
import "./index.css";
import { X, House, User, Gear, UsersThree } from "@phosphor-icons/react";
import { List } from "@phosphor-icons/react";
import { useNavbarOpen } from '../../contexts/NavbarContext';
import UserProfile from "../../pages/UserProfile";


// onhover, rotates one way, when leaving, rotates the other

const NavBar = () => {  
  const {isNavbarOpen, setIsNavbarOpen} = useNavbarOpen();

  const hoverStyle = () => {
    return (
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        dur="0.2s"
        from="0 0 0"
        to="80 0 0"
        repeatCount="0"
      ></animateTransform>
    )
  }

  function handleClick() {
    setIsNavbarOpen();
  }

  const navbarOpened = () => {
    return (
      <nav className="navbar">
        <div 
          className="close-icon"
          onClick={handleClick}
        >
          <X size={32}>
            {hoverStyle()}
          </X>
        </div>
        <ul>
          <li>
            <Link to="/">
              <House size={32} />
              <span>Landing Page</span>
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <User size={32} />
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <UsersThree size={32} />
            <span>Teams</span>
          </li>
          <li>
            <Gear size={32} />
            <span>Setting</span>
          </li>
        </ul>        
      </nav>
      
    )
  }

  const navbarClosed = () => {
    return (
      <div className="list-icon"
        onClick={handleClick}
      >
        <List size={32} />
      </div>
    )
  }

  return (
    <>
      {isNavbarOpen ? navbarOpened() : navbarClosed()}
    </>
  )
}

export default NavBar;
