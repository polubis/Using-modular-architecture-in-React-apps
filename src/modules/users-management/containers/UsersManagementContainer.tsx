import React, { useEffect } from "react";
import { UsersList, UserDetails } from "../components";
import { useUsersManagement } from "../providers";

export function UsersManagementContainer() {
  const { usersFacade, userFacade } = useUsersManagement();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(usersFacade.load, []);

  const handleUserClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const { id } = e.currentTarget.dataset;

    if (id !== undefined) {
      userFacade.load(+id);
    }
  };

  return (
    <>
      <UsersList
        loading={usersFacade.users.key === "loading"}
        data={usersFacade.users.key === "loaded" ? usersFacade.users.data : []}
        onClick={handleUserClick}
      />
      {userFacade.user.key === "loaded" && (
        <UserDetails data={userFacade.user.data} onClick={userFacade.reset} />
      )}
    </>
  );
}
