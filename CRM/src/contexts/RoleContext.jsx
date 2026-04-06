import { createContext, useContext, useState } from "react";

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [roles, setRoles] = useState(["Admin"]);

  const addRole = (role) => {
    setRoles((prev) => [...prev, role]);
  };

  return (
    <RoleContext.Provider value={{ roles, addRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRoles = () => useContext(RoleContext);