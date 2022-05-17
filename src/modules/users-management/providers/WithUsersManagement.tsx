import { useMemo } from "react";
import { createContext, useContext } from "react";
import { useUserFacade, useUsersFacade } from "../facades";

interface UsersFeatureContext {
  user: ReturnType<typeof useUserFacade>;
  users: ReturnType<typeof useUsersFacade>;
}

const Context = createContext<UsersFeatureContext | null>(null);

export const WithUsersManagement = ({ children }) => {
  const user = useUserFacade();
  const users = useUsersFacade();

  const value = useMemo(
    () => ({
      user,
      users
    }),
    [user, users]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useUsersManagement = () => {
  const ctx = useContext(Context);

  if (!ctx) throw new Error("Lack of provider");

  return ctx;
};
