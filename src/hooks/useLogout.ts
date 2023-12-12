import store from "storejs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { clearUser } from "@/redux/features/userSlice";
import { ROUTES } from "@/lib/routes";

const useLogout = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogout = () => {
    store.clear();
    queryClient.clear();
    dispatch(clearUser());
    navigate(ROUTES.LOGIN);
  };

  return handleLogout;
};

export default useLogout;
