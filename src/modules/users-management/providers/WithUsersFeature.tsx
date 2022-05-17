import { useMemo } from "react";
import { createContext, useContext } from "react";
import { useUser } from "../facades/useUser";
import { useUsers } from "../facades/useUsers";

interface UsersFeatureContext {
  users: 
}

const Context = createContext();

export const WithUsersFeature = ({ children }) => {
  // const { users, isLoading: isUsersLoading } = useUsers();
  // const { user, isLoading: isUserLoading, fetchUser } = useUser();

  const value = useMemo(() => ({}), []);

  // {

  //   users,
  //   isUsersLoading,
  //   user,
  //   isUserLoading,
  //   fetchUser
  // }

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useUsersFeature = () => {
  const ctx = useContext(Context);

  if (!ctx) throw new Error("Lack of provider");

  return ctx;
};
