import { useState } from "react";
import store from "storejs";

export const useUser = () => {
  const [user, setUser] = useState<UserTypes | null>(
    () => store.get("user") || null
  );

  const setUserInStore = (user: UserTypes) => {
    store.set("user", user);
  };

  const removeUser = () => {
    store.clear();
    setUser(null);
  };

  return {
    user,
    setUser: setUserInStore,
    removeUser,
  };
};
