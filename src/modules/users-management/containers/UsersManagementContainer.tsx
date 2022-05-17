import React, { useEffect } from "react";
import { UsersList } from "../components/users-list/UsersList";
import { useUsersManagement } from "../providers/WithUsersManagement";

export function UsersManagementContainer() {
  const { usersFacade } = useUsersManagement();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(usersFacade.load, []);

  return (
    <UsersList
      loading={usersFacade.users.key === "loading"}
      data={usersFacade.users.key === "loaded" ? usersFacade.users.data : []}
      onClick={() => {}}
    />
  );
}
