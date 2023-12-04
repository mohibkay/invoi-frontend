import store from "storejs";
import axios from "@/api/axios.ts";
import { useQuery } from "@tanstack/react-query";
import { USER } from "./routes";

export const fetchUser = async () => {
  const { data } = await axios.get<UserResponse>(USER.GET);
  const { user } = data;
  store.set("user", user);
  return user;
};

export const useGetUser = () => {
  const token = store.get("token");
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    enabled: Boolean(token),
  });
};
