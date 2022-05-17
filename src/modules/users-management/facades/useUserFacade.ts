import { useState } from "react";
import { UserId } from "../services/models";
import { usersService } from "../services/services";
import { userVO } from "../value-objects";

export const useUserFacade = () => {
  const [user, setUser] = useState(userVO());

  const load = (id: UserId) => {
    (async () => {
      setUser(user.loading());
      try {
        setUser(user.loaded(await usersService.get.user(id)));
      } catch {
        setUser(user.error());
      }
    })();
  };

  return {
    user: user.valueOf(),
    load
  };
};
