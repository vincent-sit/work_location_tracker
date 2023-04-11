import React, {useState} from "react";
import {Link} from 'react-router-dom';
import { useNavbarOpen } from '../../contexts/NavbarContext';

const NavBarItem = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const {setIsNavbarOpen} = useNavbarOpen();
  const scaleValue = isHovered ? 1.075 : 1;

  const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: 'black',
  };

  const hoverStyle = {
    transform: `scale(${scaleValue})`,
    transition: "0.12s ease-in-out",
    cursor: 'pointer',
  }

  function handleMouseOver() {
    setIsHovered(true);    
  }

  function handleMouseOut() {
    setIsHovered(false);
  }

  // auto close the navbar when one of the links has been clicked
  function handleClick() {
    setIsNavbarOpen();
  }

  return (
    <div 
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      style={hoverStyle}
      onClick={handleClick}
    >
      <Link to={props.linkTo} className="link-item" style={linkStyle}>
        {props.icon}
        <span>{props.text}</span>
      </Link>
    </div>
  )
}

export default NavBarItem;