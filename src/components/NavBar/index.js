import React from "react";
import "./index.css";
import { X, House, User, Gear, UsersThree, Placeholder } from "@phosphor-icons/react";
import { List } from "@phosphor-icons/react";
import { useNavbarOpen } from '../../contexts/NavbarContext';
import NavBarItem from "../NavBarItems";


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
            <NavBarItem icon={<House size={32} />} text="Landing Page" linkTo="/"/>
          </li>
          <li>
            <NavBarItem icon={<User size={32} />} text="Profile" linkTo="/profile"/>
          </li>
          <li>
            <NavBarItem icon={<UsersThree size={32} />} text="Teams" linkTo="/profile"/>
          </li>
          <li>
            <NavBarItem icon={<Gear size={32} />} text="Setting" linkTo="/profile"/>
          </li>
        </ul>
        <div className="placeholder-icon">
          <Placeholder size={128} />
        </div>
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
