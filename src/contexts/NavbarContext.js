import React, { createContext, useContext, useState } from "react";

const NavbarContext = createContext({
  isNavbarOpen: undefined,
  setNavbarOpen: () => {}
});

export const NavbarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
 
  return (
    <NavbarContext.Provider
      value={{
        isNavbarOpen: isOpen,
        setIsNavbarOpen: () => { setIsOpen(!isOpen) }
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
 };
 
export const useNavbarOpen = () => useContext(NavbarContext);
 