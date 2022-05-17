import React from "react";
import { UsersManagementContainer } from "./containers";
import { WithUsersManagement } from "./providers";

export function UsersManagement() {
  return (
    <WithUsersManagement>
      <UsersManagementContainer />
    </WithUsersManagement>
  );
}
