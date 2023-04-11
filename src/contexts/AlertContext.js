import React, { createContext, useContext, useState } from "react";

const AlertContext = createContext({
  isAlertOn: undefined,
  switchAlert: () => {},
  alertMessage: undefined,
  setAlertMessage: () => {}
});

export const AlertProvider = ({ children }) => {
  const [isOn, setIsOn] = useState(false);
  const [message, setMessage] = useState("");
 
  return (
    <AlertContext.Provider
      value={{
        isAlertOn: isOn,
        switchAlert: () => { setIsOn(!isOn) },
        alertMessage: message,
        setAlertMessage: (text) => { setMessage(text) }
      }}
    >
      {children}
    </AlertContext.Provider>
  );
 };
 
export const useAlert = () => useContext(AlertContext);
 