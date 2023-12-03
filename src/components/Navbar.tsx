import store from "storejs";
import { useQueryClient } from "@tanstack/react-query";
import { ROUTES } from "@/lib/routes";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useAppSelector } from "@/redux/hooks";

const Navbar = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = useAppSelector((state) => state.user);
  const { credits = 0 } = user.user || {};

  const handleLogout = () => {
    store.clear();
    queryClient.clear();
    navigate(ROUTES.LOGIN);
  };

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
      <p>Credits: {credits}</p>
    </div>
  );
};

export default Navbar;
