import store from "storejs";
import { useQueryClient } from "@tanstack/react-query";
import { ROUTES } from "@/lib/routes";
import { useNavigate, Link } from "react-router-dom";

import { useAppSelector } from "@/redux/hooks";
import { Button } from "./ui/button";
import { Icons } from "./utils/Icons";

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
    <nav className='flex justify-between items-baseline border-b shadow-sm px-4 py-2'>
      <Link to={ROUTES.DASHBOARD} className='text-3xl'>
        Invoi
      </Link>

      <p className='text-lg'>Credits: {credits}</p>
      <Button variant='link' onClick={handleLogout}>
        <Icons.logout />
      </Button>
    </nav>
  );
};

export default Navbar;
