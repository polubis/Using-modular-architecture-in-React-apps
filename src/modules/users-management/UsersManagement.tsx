import React from "react";

import UsersList from "./components/users-list/UsersList";
import UserDetails from "./components/user-details/UserDetails";
import { WithUsersFeature } from "./providers/WithUsersFeature";

export function UsersManagement() {
  return (
    <WithUsersFeature>
      <UsersList />
      <UserDetails />
    </WithUsersFeature>
  );
}
