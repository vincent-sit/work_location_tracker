import React, { createContext, useContext, useState } from "react";

const UserIdContext = createContext({
  userId: "",
  setUserId: () => {}
});

export const UserIdProvider = ({ children, userId }) => {
  const [id, setId] = useState(userId);
 
  return (
    <UserIdContext.Provider
      value={{
        userId: id,
        setUserId: (newUserId) => { setId(newUserId) }
      }}
    >
      {children}
    </UserIdContext.Provider>
  );
 };
 
export const useUserId = () => useContext(UserIdContext);
 